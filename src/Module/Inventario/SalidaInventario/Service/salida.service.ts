import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { DocumentoInventario } from 'src/Entities/DocumentoInventario';
import { Producto } from 'src/Entities/Producto.entity';
import { ProductoDocumentoDto } from '../Dto/productosDocumento.dto';
import { DocumentoInventarioProducto } from 'src/Entities/DocumentoInventarioProducto';
import { Stock } from 'src/Entities/Stock.entity';
import { SalidaDto } from '../Dto/salida.dto';

@Injectable()
export class SalidaService {
  constructor(
    @InjectRepository(DocumentoInventario)
    private readonly salidaRepository: Repository<DocumentoInventario>,
    @InjectRepository(DocumentoInventarioProducto)
    private readonly docProdRepository: Repository<DocumentoInventarioProducto>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    private dataSource: DataSource,
  ) {}

  async crearSalida(createDto: SalidaDto) {
    const documento = this.salidaRepository.create(createDto);
    return await this.salidaRepository.save(documento);
  }

  async obtenerSalidas() {
    return await this.dataSource
      .createQueryBuilder(DocumentoInventario, 'd')
      .select([
        'd.IdDocumento as IdDocumento',
        'd.DocumentoReferencia as DocumentoReferencia',
        'd.TipoDocumento as TipoDocumento',
        'd.Observacion as ObservacionEstado',
        "COALESCE(d.Estado, 'PENDIENTE') as Estado",
      ])
      .where('d.TipoDocumento = :documento', { documento: 'SALIDA' })
      .getRawMany();
  }

  async obtenerSalidaPorId(id: number) {
    return await this.salidaRepository.findOneBy({ IdDocumento: id });
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
        'documento_inventario_producto',
        'dip',
        'p.IdProducto = dip.IdProducto and dip.IdDocumento = :documentoId',
        { documentoId: id },
      )
      .where('dip.IdInvProd is null')
      .getRawMany();
  }

  async obtenerProductosTable(id: number) {
    return await this.dataSource
      .createQueryBuilder()
      .select([
        'p.IdInvProd as id',
        'pr.codigo as codigo',
        'pr.Descripcion as descripcion',
        'p.PrecioUnitario as precioUnidad',
        'p.Cantidad as cantidad',
        '(p.PrecioUnitario * p.Cantidad) as precioTotal',
      ])
      .from(DocumentoInventarioProducto, 'p')
      .innerJoin('Producto', 'pr', 'p.IdProducto = pr.IdProducto')
      .where('p.IdDocumento = :documento', { documento: id })
      .getRawMany();
  }

  async createProductosDocInv(id: number, createDto: ProductoDocumentoDto) {
    for (const reg of createDto.Productos) {
      const prodDoc = new DocumentoInventarioProducto();
      prodDoc.IdDocumento = id;
      prodDoc.IdProducto = reg['id'];
      prodDoc.Cantidad = reg['cantidad'];
      prodDoc.PrecioUnitario = reg['precioUnidad'];

      const newProdDoc = this.docProdRepository.create(prodDoc);
      this.docProdRepository.save(newProdDoc);
    }

    return true;
  }

  async generateSalida(id: number) {
    const documento = await this.salidaRepository.findOneBy({
      IdDocumento: id,
    });

    const ProducotsDocumentos = await this.docProdRepository.find({
      where: { IdDocumento: id },
    });

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

      if (producto.Cantidad > productoStock.inventario) {
        throw new ConflictException(
          `No hay cantidad suficiente en el inventario para el producto ${productoStock.codigo},
            cantidad disponibel ${productoStock.inventario}`,
        );
      }
    }

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
    await this.salidaRepository.save(documento);
  }

  async eliminarSalida(id: number) {
    const salidaExistente = await this.salidaRepository.findOne({
      where: { IdDocumento: id },
    });

    if (!salidaExistente) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }

    if (salidaExistente.Estado == 'EJECUTADO') {
      throw new NotFoundException(
        `La salida ya fue ejecutada, no se puede eliminar`,
      );
    }

    return await this.docProdRepository.delete({ IdInvProd: id });
  }

  async eliminarRegistroTable(id: number) {
    const salidaExistente = await this.docProdRepository.findOne({
      where: { IdInvProd: id },
    });

    if (!salidaExistente) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }
    return await this.docProdRepository.delete({ IdInvProd: id });
  }

  async actualizarProducto(id: number, updateDto: SalidaDto) {
    const salidaExistente = await this.salidaRepository.findOne({
      where: { IdDocumento: id },
    });

    if (!salidaExistente) {
      throw new NotFoundException(`Salida con ID ${id} no encontrado`);
    }
    const salidaActualizado = this.salidaRepository.merge(
      salidaExistente,
      updateDto,
    );

    return await this.salidaRepository.save(salidaActualizado);
  }
}
