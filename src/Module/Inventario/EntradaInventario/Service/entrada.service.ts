import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { DocumentoInventario } from 'src/Entities/DocumentoInventario';
import { EntradaDto } from '../Dto/entrada.dto';
import { Producto } from 'src/Entities/Producto.entity';
import { ProductoDocumentoDto } from '../Dto/productosDocumento.dto';
import { DocumentoInventarioProducto } from 'src/Entities/DocumentoInventarioProducto';
import { Stock } from 'src/Entities/Stock.entity';

@Injectable()
export class EntradaService {
  constructor(
    @InjectRepository(DocumentoInventario)
    private readonly entradaRepository: Repository<DocumentoInventario>,
    @InjectRepository(DocumentoInventarioProducto)
    private readonly docProdRepository: Repository<DocumentoInventarioProducto>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    private dataSource: DataSource,
  ) {}

  async crearEntrada(createDto: EntradaDto) {
    const documento = this.entradaRepository.create(createDto);
    return await this.entradaRepository.save(documento);
  }

  async obtenerEntradas() {
    return await this.dataSource
      .createQueryBuilder(DocumentoInventario, 'd')
      .select([
        'd.IdDocumento as IdDocumento',
        'd.DocumentoReferencia as DocumentoReferencia',
        'd.TipoDocumento as TipoDocumento',
        'd.Observacion as ObservacionEstado',
        'p.Nombre as Proveedor',
        "COALESCE(d.Estado, 'PENDIENTE') as Estado",
      ])
      .leftJoin('Proveedor', 'p', 'd.IdProveedor = p.IdProveedor')
      .where('d.TipoDocumento = :documento', { documento: 'ENTRADA' })
      .getRawMany();
  }

  async obtenerEntradaPorId(id: number) {
    return await this.entradaRepository.findOneBy({ IdDocumento: id });
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

  async generateEntrada(id: number) {
    const documento = await this.entradaRepository.findOneBy({
      IdDocumento: id,
    });

    const ProducotsDocumentos = await this.docProdRepository.find({
      where: { IdDocumento: id },
    });

    for (const producto of ProducotsDocumentos) {
      const productoStock = await this.stockRepository.findOne({
        where: {
          Proveedor: documento.IdProveedor,
          IdProducto: producto.IdProducto,
        },
      });
      if (productoStock) {
        productoStock.Cantidad =
          Number(productoStock.Cantidad) + Number(producto.Cantidad);
        await this.stockRepository.save(productoStock);
      } else {
        const newStock = new Stock();
        newStock.IdProducto = producto.IdProducto;
        newStock.Cantidad = producto.Cantidad;
        newStock.Proveedor = documento.IdProveedor;
        const stock = this.stockRepository.create(newStock);
        await this.stockRepository.save(stock);
      }
    }
    documento.Estado = 'EJECUTADO';
    await this.entradaRepository.save(documento);
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

  async actualizarEntrada(id: number, updateDto: EntradaDto) {
    const salidaExistente = await this.entradaRepository.findOne({
      where: { IdDocumento: id },
    });

    if (!salidaExistente) {
      throw new NotFoundException(`Salida con ID ${id} no encontrado`);
    }
    const salidaActualizado = this.entradaRepository.merge(
      salidaExistente,
      updateDto,
    );

    return await this.entradaRepository.save(salidaActualizado);
  }
}
