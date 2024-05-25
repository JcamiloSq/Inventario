import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductoDto {
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  Descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  Precio: number;

  @IsString()
  @IsNotEmpty()
  UnidadMedida: string;

  @IsNumber()
  @IsNotEmpty()
  IdCategoria: number;
}
