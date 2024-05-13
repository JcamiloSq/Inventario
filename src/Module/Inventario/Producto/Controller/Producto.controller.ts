import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductoService } from '../Service/Producto.service';
import { ProductoDto } from '../Dto/Producto.dto';

@Controller('producto')
export class ProductoController {
  constructor(private productoService: ProductoService) {}

  @Post()
  async crearProducto(@Body() createDto: ProductoDto) {
    try {
      return this.productoService.crearProducto(createDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get('categoria')
  async obtenerCategoria() {
    return await this.productoService.obtenerCategoria();
  }

  @Get(':id')
  async obtenerProductoPorId(@Param('id') id: number) {
    return await this.productoService.obtenerProductoPorId(id);
  }

  @Get()
  async obtenerProductos() {
    return await this.productoService.obtenerProductos();
  }

  @Put(':id')
  async actualizarProducto(
    @Param('id') id: number,
    @Body() updateDto: ProductoDto,
  ) {
    try {
      return await this.productoService.actualizarProducto(id, updateDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Delete(':id')
  async borrarProducto(@Param('id') id: number) {
    try {
      return await this.productoService.borrarProducto(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
