import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty } from 'class-validator';

export class FacturaProductoDto {
  @IsArray()
  @IsNotEmpty()
  @Type(() => Object)
  Productos: object[];
}
