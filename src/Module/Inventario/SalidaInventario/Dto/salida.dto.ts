import { IsNotEmpty, IsString } from 'class-validator';

export class SalidaDto {
  @IsString()
  @IsNotEmpty()
  DocumentoReferencia: string;

  @IsString()
  @IsNotEmpty()
  TipoDocumento: string;

  @IsString()
  @IsNotEmpty()
  Observacion: string;
}
