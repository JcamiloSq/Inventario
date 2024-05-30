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
import { CategoriaService } from '../Service/Categoria.service';
import { CategoriaDto } from '../Dto/Categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private categoriaService: CategoriaService) {}

  @Get()
  async obtenerCategoria() {
    return await this.categoriaService.ConsultarCategoria();
  }

  @Post()
  async crearCategoria(@Body() createDto: CategoriaDto) {
    try {
      return this.categoriaService.crearCategoria(createDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get(':id')
  async obtenerCategoriaPorID(@Param('id') id: number) {
    return await this.categoriaService.obtenerCategoriaPorId(id);
  }

  @Put(':id')
  async actualizarCategoria(
    @Param('id') id: number,
    @Body() updateDto: CategoriaDto,
  ) {
    try {
      return await this.categoriaService.actualizarCategoria(id, updateDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Delete(':id')
  async borrarCategoria(@Param('id') id: number) {
    try {
      return await this.categoriaService.borrarCategoria(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
