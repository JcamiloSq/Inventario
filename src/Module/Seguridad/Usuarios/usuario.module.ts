import { Module } from '@nestjs/common';
import { Usuario } from 'src/Entities/Usuario.entity';
import { UsuarioController } from './Controller/usuario.controller';
import { LoginController } from './Controller/login.controller';
import { LoginService } from './Services/login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/Entities/Rol.entity';
import { RolService } from './Services/rol.service';
import { RolController } from './Controller/rol.controller';
import { Producto } from 'src/Entities/Producto.entity';
import { ProductoController } from 'src/Module/Inventario/Producto/Controller/Producto.controller';
import { ProductoService } from 'src/Module/Inventario/Producto/Service/Producto.service';
import { Categoria } from 'src/Entities/Categoria.entity';
import { HashService } from './Services/hash.service';
import { UsuarioService } from './Services/usuario.service';
import { CategoriaController } from 'src/Module/Inventario/Producto/Controller/Categoria.controller';
import { CategoriaService } from 'src/Module/Inventario/Producto/Service/Categoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol, Producto, Categoria])],
  controllers: [
    UsuarioController,
    LoginController,
    RolController,
    ProductoController,
    CategoriaController,
  ],
  providers: [
    LoginService,
    RolService,
    ProductoService,
    HashService,
    UsuarioService,
    CategoriaService,
  ],
})
export class UsuarioModule {}
