import { IsNotEmpty, IsString } from 'class-validator';

export class RolDto {
  @IsString()
  @IsNotEmpty()
  NombreRol: string;


  //crear datos 
}
