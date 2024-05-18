import { Controller, Get } from '@nestjs/common';
import { ConsultaService } from '../Service/Consulta.service';

@Controller('consultainventario')
export class ConsultaController {
  constructor(private consultaService: ConsultaService) {}

  @Get()
  async obtenerCategoria() {
    return await this.consultaService.obtenerConsulta();
  }
}
