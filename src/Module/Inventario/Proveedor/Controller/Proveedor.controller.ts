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
import { ProveedorService } from '../Service/Proveedor.service';
import { ProveedorDto } from '../Dto/Proveedor.dto';

@Controller('proveedor')
export class ProveedorController {
  constructor(private proveedorService: ProveedorService) {}

  @Post()
  async crearProveedor(@Body() createDto: ProveedorDto) {
    try {
      return this.proveedorService.crearProveedor(createDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  
  @Get('listproveedores')
  async listProveedores() {
    return await this.proveedorService.ListProveedores();
  }


  @Get(':id')
  async obtenerProveedorPorId(@Param('id') id: number) {
    return await this.proveedorService.obtenerProveedorPorId(id);
  }

  @Get()
  async obtenerProveedor() {
    return await this.proveedorService.obtenerProveedor();
  }

  @Put(':id')
  async actualizarProveedor(
    @Param('id') id: number,
    @Body() updateDto: ProveedorDto,
  ) {
    try {
      return await this.proveedorService.actualizarProveedor(id, updateDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Delete(':id')
  async borrarProveedor(@Param('id') id: number) {
    try {
      return await this.proveedorService.borrarProveedor(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
