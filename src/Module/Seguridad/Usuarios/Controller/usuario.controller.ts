import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioDto } from '../Dto/usuario.dto';
import { UsuarioService } from '../Services/usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}
  @Post()
  async crearUsuario(@Body() createDto: UsuarioDto) {
    return await this.usuarioService.crearUsuario(createDto);
  }

  @Get('roles')
  async obtenerRoles() {
    return await this.usuarioService.obtenerRoles();
  }

  @Get()
  async obtenerUsuarios() {
    return await this.usuarioService.obtenerUsuarios();
  }

  @Get(':id')
  async obtenerUsuarioPorId(@Param('id') id: number) {
    return await this.usuarioService.obtenerUsuarioPorId(id);
  }

  @Put(':id')
  async actualizarUsuario(
    @Param('id') id: number,
    @Body() updateDto: UsuarioDto,
  ) {
    return await this.usuarioService.actualizarUsuario(id, updateDto);
  }

  @Delete(':id')
  async eliminarUsuario(@Param('id') id: number) {
    return await this.usuarioService.eliminarUsuario(id);
  }
}
