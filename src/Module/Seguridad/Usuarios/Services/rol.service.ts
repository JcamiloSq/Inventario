import { Injectable, NotFoundException } from '@nestjs/common';
//import { LoginDto } from '../Dto/login.dto';
import { DataSource, Repository } from 'typeorm';
//import { Usuario } from 'src/Entities/Usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/Entities/Rol.entity';

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

}
