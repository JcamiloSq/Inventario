import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Categoria } from 'src/Entities/Categoria.entity';
import { CategoriaDto } from '../Dto/Categoria.dto';


@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
    private dataSource: DataSource,
  ) {}

  async ConsultarCategoria() {
    return await this.dataSource.createQueryBuilder(Categoria, 'Categoria').getMany();
  }

    //Obtener el  por ID

    async obtenerCategoriaPorId(id: number) {
      return await this.categoriaRepository.findOneBy({ IdCategoria: id });
    }

 
  async crearCategoria(createDto: CategoriaDto) {
    const newCategoria = this.categoriaRepository.create(createDto);
    return this.categoriaRepository.save(newCategoria);
  }

  async actualizarCategoria(id: number, updateDto: CategoriaDto) {
    const categoriaExistente = await this.categoriaRepository.findOne({
      where: { IdCategoria: id },
    });

    if (!categoriaExistente) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrado`);
    }
    const categoriaActualizado = this.categoriaRepository.merge(
      categoriaExistente,
      updateDto,
    );

    return this.categoriaRepository.save(categoriaActualizado);
  }

  async borrarCategoria(id: number) {
    return await this.categoriaRepository.delete({ IdCategoria: id });
  }

  
}
