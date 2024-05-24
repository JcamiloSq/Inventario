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

  @IsNumber()
  @IsNotEmpty()
  IdCategoria: number;
}
