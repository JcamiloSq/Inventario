import { Body, ConflictException, Controller, Get, Post, Put } from '@nestjs/common';
import { ProductoService } from '../Service/Producto.service';
import { ProductoDto } from '../Dto/Producto.dto';

@Controller('producto')
export class ProductoController {
    constructor(private productoService: ProductoService){}
  @Post()
  async createProducto(@Body() createDto:ProductoDto) {
    try {
        return this.productoService.createProducto(createDto);

    }   catch(error) {
        throw new ConflictException(error.message)
    }
  }

  @Get()
  async getProducto() {
    return await this.productoService.getProducto();
  }
  
  @Get('categoria')
  async getCategoria() {
    return await this.productoService.obtenerCategoria();
  }

  @Put()
  async updateUsuario() {}

}
