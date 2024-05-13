import { Controller, Get } from '@nestjs/common';
import { RolService } from '../Services/rol.service';

@Controller('controladorRol')
export class RolController {
constructor(private rolService: RolService){}

  @Get()
  async getRoles() {
  
    return await this.rolService.ConsultarRoles();
  }
}
