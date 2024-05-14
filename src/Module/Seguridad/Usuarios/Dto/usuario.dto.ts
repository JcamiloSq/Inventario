import { IsNotEmpty, IsString } from 'class-validator';

export class UsuarioDto {
  @IsString()
  @IsNotEmpty()
  Usuario: string;

  @IsString()
  @IsNotEmpty()
  NombreCompleto: string;

  @IsString()
  @IsNotEmpty()
  Contrasena: string;

  @IsString()
  @IsNotEmpty()
  IdRol: string;

  @IsString()
  @IsNotEmpty()
  Email: string;
}
