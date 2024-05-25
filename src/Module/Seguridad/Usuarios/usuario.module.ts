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
import { ConsultaController } from 'src/Module/Inventario/InventarioDisponibleConsulta/Controller/Consulta.controller';
import { ConsultaService } from 'src/Module/Inventario/InventarioDisponibleConsulta/Service/Consulta.service';
import { EntradaService } from 'src/Module/Inventario/EntradaInventario/Service/entrada.service';
import { EntradaController } from 'src/Module/Inventario/EntradaInventario/Controller/entrada.controller';
import { DocumentoInventario } from 'src/Entities/DocumentoInventario';
import { DocumentoInventarioProducto } from 'src/Entities/DocumentoInventarioProducto';
import { Stock } from 'src/Entities/Stock.entity';
import { SalidaService } from 'src/Module/Inventario/SalidaInventario/Service/salida.service';
import { SalidaController } from 'src/Module/Inventario/SalidaInventario/Controller/salida.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Rol,
      Producto,
      Categoria,
      DocumentoInventario,
      DocumentoInventarioProducto,
      Stock,
    ]),
  ],
  controllers: [
    UsuarioController,
    LoginController,
    RolController,
    ProductoController,
    CategoriaController,
    ConsultaController,
    EntradaController,
    SalidaController,
  ],
  providers: [
    LoginService,
    RolService,
    ProductoService,
    HashService,
    UsuarioService,
    CategoriaService,
    ConsultaService,
    EntradaService,
    SalidaService,
  ],
})
export class UsuarioModule {}
