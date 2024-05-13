import { Module } from '@nestjs/common';
import { Usuario } from 'src/Entities/Usuario.entity';
import { UsuarioController } from './Controller/usuario.controller';
import { LoginController } from './Controller/login.controller';
import { LoginService } from './Services/login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/Entities/Rol.entity';
import { RolService } from './Services/rol.service';
import { RolController } from './Controller/rol.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario,Rol])],
  controllers: [UsuarioController, LoginController, RolController],
  providers: [LoginService, RolService],
})
export class UsuarioModule {}
