import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('usuario')
export class UsuarioController {
  @Post()
  async createUsuario() {}

  @Get()
  async getUsuarioById() {}

  @Get()
  async getUsuarios() {}

  @Put()
  async updateUsuario() {}

  @Put()
  async inactivateUsuario() {}
}
