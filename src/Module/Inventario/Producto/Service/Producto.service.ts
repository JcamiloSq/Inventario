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
    private dataSource: DataSource,
  ) {}

  async obtenerProductoPorId(id: number) {
    return await this.productoRepository.findOneBy({ IdProducto: id });
  }
  //Consulta con leftJoin
  async obtenerProductos() {
    return await this.dataSource
      .createQueryBuilder(Producto, 'p')
      .select([
        'p.IdProducto as IdProducto',
        'p.codigo as codigo',
        'p.Precio as Precio',
        'p.Descripcion as Descripcion',
        'c.NombreCategoria as NombreCategoria',
      ])
      .leftJoin('Categoria', 'c', 'p.IdCategoria=c.IdCategoria')
      .getRawMany();
  }

  async crearProducto(createDto: ProductoDto) {
    const newProducto = this.productoRepository.create(createDto);
    return this.productoRepository.save(newProducto);
  }

  async actualizarProducto(id: number, updateDto: ProductoDto) {
    const productoExistente = await this.productoRepository.findOne({
      where: { IdProducto: id },
    });

    if (!productoExistente) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    const productoActualizado = this.productoRepository.merge(
      productoExistente,
      updateDto,
    );

    return this.productoRepository.save(productoActualizado);
  }

  async borrarProducto(id: number) {
    return await this.productoRepository.delete({ IdProducto: id });
  }

  async obtenerCategoria() {
    return await this.dataSource
      .createQueryBuilder(Categoria, 'Categoria')
      .select([
        'Categoria.idCategoria as value',
        'Categoria.NombreCategoria as label',
      ])
      .getRawMany();
  }
}
