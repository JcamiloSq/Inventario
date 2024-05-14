import { Injectable, NotFoundException } from '@nestjs/common';
//import { LoginDto } from '../Dto/login.dto';
import { DataSource, Repository } from 'typeorm';
//import { Usuario } from 'src/Entities/Usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/Entities/Rol.entity';
import { RolDto } from '../Dto/rol.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
    private dataSources: DataSource
  ) { }

  async ConsultarRoles() {
    return await this.dataSources.createQueryBuilder(Rol,'Rol').getMany();
  }
  //Obtener el Rol por ID

  async obtenerRolPorId(id: number) {
    return await this.rolRepository.findOneBy({ IdRol: id });
  }


  async crearRol (createDto: RolDto) {
    const newRol = this.rolRepository.create(createDto);
    return this.rolRepository.save(newRol);
  }

  async actualizarRol(id: number, updateDto: RolDto) {
    const rolExistente = await this.rolRepository.findOne({
      where: { IdRol: id },
    });
    if (!rolExistente) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }
    const rolActualizad = this.rolRepository.merge(
      rolExistente,
      updateDto,
    );

    return this.rolRepository.save(rolActualizad);
  }

  async borrarRol(id: number) {
    return await this.rolRepository.delete({ IdRol: id });
  }
  







}
