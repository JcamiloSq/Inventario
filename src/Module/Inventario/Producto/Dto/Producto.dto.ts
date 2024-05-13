import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Double } from 'typeorm';

export class ProductoDto {
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  Descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  Precio: Double;

  @IsNumber()
  @IsNotEmpty()
  IdCategoria: number;
}
