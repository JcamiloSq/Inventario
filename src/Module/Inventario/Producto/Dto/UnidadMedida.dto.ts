import { IsNotEmpty, IsString } from 'class-validator';

export class UnidadMedidaDto {
  @IsString()
  @IsNotEmpty()
  NombreUnidadMedida: string;
}
