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
import { Proveedor } from 'src/Entities/Proveedor.entity';
import { ProveedorController } from 'src/Module/Inventario/Proveedor/Controller/Proveedor.controller';
import { ProveedorService } from 'src/Module/Inventario/Proveedor/Service/Proveedor.service';

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
      Proveedor,
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
    ProveedorController,
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
    ProveedorService,
  ],
})
export class UsuarioModule {}
