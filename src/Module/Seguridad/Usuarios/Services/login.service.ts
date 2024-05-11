import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from '../Dto/login.dto';
import { Repository } from 'typeorm';
import { Usuario } from 'src/Entities/Usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
  ) {}

  async validateUserLogin(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { Usuario: loginDto.username },
    });

    if (!user) {
      throw new NotFoundException('Las credenciales no son correctas');
    }

    if (user.Contrasena != loginDto.password) {
      throw new NotFoundException('Las credenciales no son correctas');
    }

    return { message: 'succes' };
  }
}
