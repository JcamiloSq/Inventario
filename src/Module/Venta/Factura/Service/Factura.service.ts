import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FacturaVenta } from 'src/Entities/Factura.entity';
import { FacturaVentaDto } from '../Dto/factura.dto';
import { Producto } from 'src/Entities/Producto.entity';
import { FacturaProducto } from 'src/Entities/FacturaProducto.entity';
import { Stock } from 'src/Entities/Stock.entity';
import { FacturaProductoDto } from '../Dto/FacturaProducto.dto';
import { InvoiceService } from './Invoice.service';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(FacturaVenta)
    private facturaRepository: Repository<FacturaVenta>,
    @InjectRepository(FacturaProducto)
    private facturaProductoRepository: Repository<FacturaProducto>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    private dataSource: DataSource,
    private invoiceService: InvoiceService,
  ) {}

  async ConsultarFactura() {
    return await this.dataSource
      .createQueryBuilder(FacturaVenta, 'FacturaVenta')
      .getMany();
  }

  async obtenerFacturaPorId(id: number) {
    return await this.facturaRepository.findOneBy({ IdFacturaVenta: id });
  }

  async crearFactura(createDto: FacturaVentaDto) {
    const newFacturaVenta = this.facturaRepository.create(createDto);
    return await this.facturaRepository.save(newFacturaVenta);
  }

  async actualizarFactura(id: number, updateDto: FacturaVentaDto) {
    const facturaExistente = await this.facturaRepository.findOne({
      where: { IdFacturaVenta: id },
    });

    if (!facturaExistente) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrado`);
    }
    const categoriaActualizado = this.facturaRepository.merge(
      facturaExistente,
      updateDto,
    );

    return this.facturaRepository.save(categoriaActualizado);
  }

  async borrarFactura(id: number) {
    return await this.facturaRepository.delete({ IdFacturaVenta: id });
  }

  async obtenerProductos(id: number) {
    return await this.dataSource
      .createQueryBuilder()
      .select([
        'p.IdProducto as id',
        'p.codigo as codigo',
        'p.Descripcion as descripcion',
        'p.Precio as precioUnidad',
        '0 as cantidad',
        'c.NombreCategoria as categoria',
      ])
      .from(Producto, 'p')
      .innerJoin('Categoria', 'c', 'c.IdCategoria = p.IdCategoria')
      .leftJoin(
        'FacturaProducto',
        'dip',
        'p.IdProducto = dip.IdProducto and dip.IdFacturaVenta = :documentoId',
        { documentoId: id },
      )
      .where('dip.IdFacProducto is null')
      .getRawMany();
  }

  async obtenerProductosTable(id: number) {
    return await this.dataSource
      .createQueryBuilder()
      .select([
        'p.IdFacProducto as id',
        'pr.codigo as codigo',
        'pr.Descripcion as descripcion',
        'p.PrecioUnitario as precioUnidad',
        'p.Cantidad as cantidad',
        '(p.PrecioUnitario * p.Cantidad) as precioTotal',
      ])
      .from(FacturaProducto, 'p')
      .innerJoin('Producto', 'pr', 'p.IdProducto = pr.IdProducto')
      .where('p.IdFacturaVenta = :documento', { documento: id })
      .getRawMany();
  }

  async generateSalida(id: number) {
    const documento = await this.facturaRepository.findOneBy({
      IdFacturaVenta: id,
    });

    const ProducotsDocumentos = await this.dataSource
      .createQueryBuilder(FacturaProducto, 'dip')
      .select([
        'dip.Cantidad AS Cantidad',
        'p.codigo AS codigo',
        'p.IdProducto AS IdProducto',
      ])
      .leftJoin('Producto', 'p', 'dip.IdProducto = p.IdProducto')
      .where('dip.IdFacturaVenta = :documento', { documento: id })
      .getRawMany();

    for (const producto of ProducotsDocumentos) {
      const productoStock = await this.dataSource
        .createQueryBuilder(Stock, 's')
        .select('SUM(s.Cantidad) as inventario, p.codigo as codigo')
        .innerJoin('Producto', 'p', 's.IdProducto = p.IdProducto')
        .where('s.IdProducto = :productoId', {
          productoId: producto.IdProducto,
        })
        .groupBy('s.IdProducto')
        .getRawOne();

      if (!productoStock) {
        throw new ConflictException(
          `No hay inventario para el producto ${producto.codigo}`,
        );
      }

      if (producto.Cantidad > productoStock.inventario) {
        throw new ConflictException(
          `No hay cantidad suficiente en el inventario para el producto ${productoStock.codigo},
            cantidad disponible ${productoStock.inventario}`,
        );
      }
    }

    await this.invoiceService.sendInvoice(id);

    for (const producto of ProducotsDocumentos) {
      const productoStock = await this.stockRepository.find({
        where: {
          IdProducto: producto.IdProducto,
        },
      });
      let cantidadPendiente = Number(producto.Cantidad);
      for (const stock of productoStock) {
        if (cantidadPendiente > 0) {
          const cantidadSacar =
            cantidadPendiente <= stock.Cantidad
              ? cantidadPendiente
              : stock.Cantidad;
          stock.Cantidad = Number(stock.Cantidad) - Number(cantidadSacar);
          cantidadPendiente -= Number(cantidadSacar);
          if (stock.Cantidad <= 0) {
            await this.stockRepository.delete({ IdStock: stock.IdStock });
          } else {
            await this.stockRepository.save(stock);
          }
        } else {
          break;
        }
      }
    }

    documento.Estado = 'EJECUTADO';
    await this.facturaRepository.save(documento);
  }

  async eliminarRegistroTable(id: number) {
    const salidaExistente = await this.facturaProductoRepository.findOne({
      where: { IdFacProducto: id },
    });

    if (!salidaExistente) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }
    return await this.facturaProductoRepository.delete({ IdFacProducto: id });
  }

  async createProductosDocInv(id: number, createDto: FacturaProductoDto) {
    for (const reg of createDto.Productos) {
      const prodDoc = new FacturaProducto();
      prodDoc.IdFacturaVenta = id;
      prodDoc.IdProducto = reg['id'];
      prodDoc.Cantidad = reg['cantidad'];
      prodDoc.PrecioUnitario = reg['precioUnidad'];

      const newProdDoc = this.facturaProductoRepository.create(prodDoc);
      this.facturaProductoRepository.save(newProdDoc);
    }

    return true;
  }
}
