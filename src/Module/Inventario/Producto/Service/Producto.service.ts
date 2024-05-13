import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/Entities/Producto.entity';
import { ProductoDto } from '../Dto/Producto.dto';
import { Categoria } from 'src/Entities/Categoria.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    private dataSource: DataSource
  ) {}

  async getProducto() {
    return await this.dataSource.createQueryBuilder(Producto, 'p')
    .select([
        'p.IdProducto as IdProducto', 
        'p.codigo as codigo',
        'p.Precio as Precio',
        'p.Descripcion as Descripcion',
        'c.NombreCategoria as NombreCategoria'
    ])
    .leftJoin('Categoria', 'c', 'p.IdCategoria=c.IdCategoria')
    .getRawMany();
  }

  async createProducto(createDto:ProductoDto) {
    const producto = new Producto();
    producto.codigo = createDto.codigo;
    producto.Descripcion = createDto.descripcion;
    producto.Precio = createDto.precio;
    producto.IdCategoria = createDto.categoria;
    const newProducto = this.productoRepository.create(producto);
    return this.productoRepository.save(newProducto);
  }
 
  async obtenerCategoria() {
    return await this.dataSource.createQueryBuilder(Categoria,'Categoria')
    .select([ 'Categoria.idCategoria as value', 'Categoria.NombreCategoria as label'])
    .getRawMany();
  }
}