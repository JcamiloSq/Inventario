import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UnidadMedida } from 'src/Entities/UnidadMedida.entity';
import { UnidadMedidaDto } from '../Dto/UnidadMedida.dto';

@Injectable()
export class UnidadMedidaService {
  constructor(
    @InjectRepository(UnidadMedida)
    private unidadMedidaRepository: Repository<UnidadMedida>,
    private dataSource: DataSource,
  ) {}

  async ConsultarUnidadMedida() {
    return await this.dataSource
      .createQueryBuilder(UnidadMedida, 'UnidadMedida')
      .getMany();
  }

  // Obtener UnidadMedida por ID
  async obtenerUnidadMedidaPorId(id: number) {
    return await this.unidadMedidaRepository.findOneBy({ IdUnidadMedida: id });
  }

  // Crear UnidadMedida
  async crearUnidadMedida(createDto: UnidadMedidaDto) {
    const existe = await this.unidadMedidaRepository.findOneBy({
      NombreUnidadMedida: createDto.NombreUnidadMedida,
    });

    if (existe) {
      throw new ConflictException(
        `Ya existe una unidad de medida con el nombre ${createDto.NombreUnidadMedida}`,
      );
    }

    const newUnidadMedida = this.unidadMedidaRepository.create(createDto);
    return await this.unidadMedidaRepository.save(newUnidadMedida);
  }

  // Actualizar UnidadMedida
  async actualizarUnidadMedida(id: number, updateDto: UnidadMedidaDto) {
    const unidadMedidaExistente = await this.unidadMedidaRepository.findOneBy({
      IdUnidadMedida: id,
    });

    if (!unidadMedidaExistente) {
      throw new NotFoundException(
        `Unidad de medida con ID ${id} no encontrado`,
      );
    }

    const existe = await this.unidadMedidaRepository.findOne({
      where: {
        NombreUnidadMedida: updateDto.NombreUnidadMedida,
        IdUnidadMedida: Not(id),
      },
    });

    if (existe) {
      throw new ConflictException(
        `Ya existe una unidad de medida con el nombre ${updateDto.NombreUnidadMedida}`,
      );
    }

    const unidadMedidaActualizada = this.unidadMedidaRepository.merge(
      unidadMedidaExistente,
      updateDto,
    );

    return this.unidadMedidaRepository.save(unidadMedidaActualizada);
  }

  // Borrar UnidadMedida
  async borrarUnidadMedida(id: number) {
    return await this.unidadMedidaRepository.delete({ IdUnidadMedida: id });
  }
}
