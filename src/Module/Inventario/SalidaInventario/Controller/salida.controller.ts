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
import { ProductoDocumentoDto } from '../Dto/productosDocumento.dto';
import { SalidaService } from '../Service/salida.service';
import { SalidaDto } from '../Dto/salida.dto';

@Controller('salida')
export class SalidaController {
  constructor(private salidaService: SalidaService) {}
  @Post()
  async crearUsuario(@Body() createDto: SalidaDto) {
    try {
      return await this.salidaService.crearSalida(createDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get('productos/:id')
  async obtenerProductos(@Param('id') id: number) {
    try {
      return await this.salidaService.obtenerProductos(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get('productostable/:id')
  async obtenerProductosTable(@Param('id') id: number) {
    try {
      return await this.salidaService.obtenerProductosTable(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get()
  async obtenerEntradas() {
    try {
      return await this.salidaService.obtenerSalidas();
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get(':id')
  async obtenerEntradaPorId(@Param('id') id: number) {
    try {
      return await this.salidaService.obtenerSalidaPorId(id);
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
      return await this.salidaService.createProductosDocInv(id, createDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Post('generarsalida/:id')
  async generarEntrada(@Param('id') id: number) {
    try {
      await this.salidaService.generateSalida(id);
      return [];
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Put(':id')
  async actualizarSalida(
    @Param('id') id: number,
    @Body() updateDto: SalidaDto,
  ) {
    try {
      return await this.salidaService.actualizarProducto(id, updateDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Delete('eliminartable/:id')
  async eliminarRegistroTabla(@Param('id') id: number) {
    try {
      return await this.salidaService.eliminarRegistroTable(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
