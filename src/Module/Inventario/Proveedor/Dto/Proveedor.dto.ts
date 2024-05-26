import { IsNotEmpty, IsString } from 'class-validator';

export class ProveedorDto {
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @IsString()
  @IsNotEmpty()
  Nit: string;

  @IsString()
  @IsNotEmpty()
  Telefono: string;

  @IsString()
  @IsNotEmpty()
  Email: string;

}
