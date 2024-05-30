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
import { FacturaService } from '../Service/Factura.service';
import { FacturaVentaDto } from '../Dto/factura.dto';
import { FacturaProductoDto } from '../Dto/FacturaProducto.dto';

@Controller('facturaventa')
export class FacturaVentaController {
  constructor(private facturaService: FacturaService) {}

  @Get('productos/:id')
  async obtenerProductos(@Param('id') id: number) {
    try {
      return await this.facturaService.obtenerProductos(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get('productostable/:id')
  async obtenerProductosTable(@Param('id') id: number) {
    try {
      return await this.facturaService.obtenerProductosTable(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get()
  async obtenerFactura() {
    return await this.facturaService.ConsultarFactura();
  }

  @Post()
  async crearFactura(@Body() createDto: FacturaVentaDto) {
    try {
      return this.facturaService.crearFactura(createDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get(':id')
  async obtenerFacturaPorID(@Param('id') id: number) {
    return await this.facturaService.obtenerFacturaPorId(id);
  }

  @Put(':id/createProductos')
  async crearProductoDocInventario(
    @Param('id') id: number,
    @Body() createDto: FacturaProductoDto,
  ) {
    try {
      return await this.facturaService.createProductosDocInv(id, createDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Delete('eliminartable/:id')
  async eliminarRegistroTabla(@Param('id') id: number) {
    try {
      return await this.facturaService.eliminarRegistroTable(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Put(':id')
  async actualizarFactura(
    @Param('id') id: number,
    @Body() updateDto: FacturaVentaDto,
  ) {
    try {
      return await this.facturaService.actualizarFactura(id, updateDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Delete(':id')
  async borrarFactura(@Param('id') id: number) {
    try {
      return await this.facturaService.borrarFactura(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Post('generarsalida/:id')
  async generarSalida(@Param('id') id: number) {
    try {
      await this.facturaService.generateSalida(id);
      return [];
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
