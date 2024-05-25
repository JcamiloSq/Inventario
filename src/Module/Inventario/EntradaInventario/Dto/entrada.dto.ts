import { IsNotEmpty, IsString } from 'class-validator';

export class EntradaDto {
  @IsString()
  @IsNotEmpty()
  Proveedor: string;

  @IsString()
  @IsNotEmpty()
  DocumentoReferencia: string;

  @IsString()
  @IsNotEmpty()
  TipoDocumento: string;
}
