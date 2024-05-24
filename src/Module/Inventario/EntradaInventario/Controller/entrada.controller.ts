import {
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EntradaService } from '../Service/entrada.service';
import { EntradaDto } from '../Dto/entrada.dto';
import { ProductoDocumentoDto } from '../Dto/productosDocumento.dto';

@Controller('entrada')
export class EntradaController {
  constructor(private entradaService: EntradaService) {}
  @Post()
  async crearUsuario(@Body() createDto: EntradaDto) {
    try {
      return await this.entradaService.crearEntrada(createDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get('productos')
  async obtenerProductos() {
    try {
      return await this.entradaService.obtenerProductos();
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get('productostable/:id')
  async obtenerProductosTable(@Param('id') id: number) {
    try {
      return await this.entradaService.obtenerProductosTable(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get()
  async obtenerEntradas() {
    try {
      return await this.entradaService.obtenerEntradas();
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get(':id')
  async obtenerEntradaPorId(@Param('id') id: number) {
    try {
      return await this.entradaService.obtenerEntradaPorId(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Put(':id/createProductos')
  async crearProductoDocInventario(
    @Param('id') id: number,
    @Body() createDto: ProductoDocumentoDto,
  ) {
    try {
      return await this.entradaService.createProductosDocInv(id, createDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Post('generarentrada/:id')
  async generarEntrada(@Param('id') id: number) {
    try {
      await this.entradaService.generateEntrada(id);
      return [];
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
