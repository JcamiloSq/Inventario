import { Module } from '@nestjs/common';
import { Usuario } from 'src/Entities/Usuario.entity';
import { UsuarioController } from './Controller/usuario.controller';

@Module({
  imports: [Usuario],
  controllers: [UsuarioController],
  providers: [],
})
export class AppModule {}
