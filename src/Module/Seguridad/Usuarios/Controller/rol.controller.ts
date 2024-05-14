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
import { RolService } from '../Services/rol.service';
import { RolDto } from '../Dto/rol.dto';

@Controller('rol')
export class RolController {
constructor(private rolService: RolService){}

  @Get()
  async getRoles() {
  
    return await this.rolService.ConsultarRoles();
  }

  @Post()
  async crearRol(@Body() createDto: RolDto) {
    try {
      return this.rolService.crearRol(createDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get(':id')
  async obtenerRolPorId(@Param('id') id: number) {
    return await this.rolService.obtenerRolPorId(id);
  }


  @Put(':id')
  async actualizarRol(
    @Param('id') id: number,
    @Body() updateDto: RolDto,
  ) {
    try {
      return await this.rolService.actualizarRol(id, updateDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Delete(':id')
  async borrarRol(@Param('id') id: number) {
    try {
      return await this.rolService.borrarRol(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
