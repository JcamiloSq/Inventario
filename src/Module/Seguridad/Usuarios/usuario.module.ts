import { Module } from '@nestjs/common';
import { Usuario } from 'src/Entities/Usuario.entity';
import { UsuarioController } from './Controller/usuario.controller';
import { LoginController } from './Controller/login.controller';
import { LoginService } from './Services/login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/Entities/Producto.entity';
import { ProductoController } from 'src/Module/Inventario/Producto/Controller/Producto.controller';
import { ProductoService } from 'src/Module/Inventario/Producto/Service/Producto.service';
import { Categoria } from 'src/Entities/Categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Producto, Categoria])],
  controllers: [UsuarioController, LoginController, ProductoController],
  providers: [LoginService, ProductoService],
})
export class AppModule {}
