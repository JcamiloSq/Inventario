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
import { UnidadMedidaService } from '../Service/UnidadMedida.service';
import { UnidadMedidaDto } from '../Dto/UnidadMedida.dto';

@Controller('unidadMedida')
export class UnidadMedidaController {
  constructor(private unidadMedidaService: UnidadMedidaService) {}

  @Get()
  async obtenerUnidadesMedida() {
    return await this.unidadMedidaService.ConsultarUnidadMedida();
  }

  @Post()
  async crearUnidadMedida(@Body() createDto: UnidadMedidaDto) {
    try {
      return await this.unidadMedidaService.crearUnidadMedida(createDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get(':id')
  async obtenerUnidadMedidaPorID(@Param('id') id: number) {
    return await this.unidadMedidaService.obtenerUnidadMedidaPorId(id);
  }

  @Put(':id')
  async actualizarUnidadMedida(
    @Param('id') id: number,
    @Body() updateDto: UnidadMedidaDto,
  ) {
    try {
      return await this.unidadMedidaService.actualizarUnidadMedida(id, updateDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Delete(':id')
  async borrarUnidadMedida(@Param('id') id: number) {
    try {
      return await this.unidadMedidaService.borrarUnidadMedida(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
