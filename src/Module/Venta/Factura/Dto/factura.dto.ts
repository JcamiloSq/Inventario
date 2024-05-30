import { IsNotEmpty, IsString } from 'class-validator';

export class FacturaVentaDto {
  @IsString()
  @IsNotEmpty()
  Cliente: string;

  @IsString()
  @IsNotEmpty()
  DocumentoReferencia: string;

  @IsString()
  @IsNotEmpty()
  Observacion: string;

  @IsString()
  @IsNotEmpty()
  Estado: string;
}
