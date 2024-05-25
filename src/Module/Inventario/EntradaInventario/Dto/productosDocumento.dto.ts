import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty } from 'class-validator';

export class ProductoDocumentoDto {
  @IsArray()
  @IsNotEmpty()
  @Type(() => Object)
  Productos: object[];
}
