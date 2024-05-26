import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EntradaDto {
  @IsNumber()
  @IsNotEmpty()
  IdProveedor: number;

  @IsString()
  @IsNotEmpty()
  DocumentoReferencia: string;

  @IsString()
  @IsNotEmpty()
  TipoDocumento: string;
}
