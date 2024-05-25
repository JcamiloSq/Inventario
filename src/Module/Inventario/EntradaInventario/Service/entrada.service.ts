import { Injectable } from '@nestjs/common';
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
      .where('d.TipoDocumento = :documento', { documento: 'ENTRADA' })
      .getMany();
  }

  async obtenerEntradaPorId(id: number) {
    return await this.entradaRepository.findOneBy({ IdDocumento: id });
  }

  async obtenerProductos() {
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
          Proveedor: documento.Proveedor,
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
        newStock.Proveedor = documento.Proveedor;
        const stock = this.stockRepository.create(newStock);
        await this.stockRepository.save(stock);
      }
    }
  }
}
