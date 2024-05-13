import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RolDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nombre de usaurio',
  })
  rol: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Contraseña de usuario',
  })
  id: string;

  //crear datos 
}
