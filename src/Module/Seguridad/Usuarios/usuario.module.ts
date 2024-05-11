import { Module } from '@nestjs/common';
import { Usuario } from 'src/Entities/Usuario.entity';
import { UsuarioController } from './Controller/usuario.controller';
import { LoginController } from './Controller/login.controller';
import { LoginService } from './Services/login.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuarioController, LoginController],
  providers: [LoginService],
})
export class UsuarioModule {}
