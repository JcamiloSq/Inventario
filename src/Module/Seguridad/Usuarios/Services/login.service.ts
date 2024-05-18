import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from '../Dto/login.dto';
import { Repository } from 'typeorm';
import { Usuario } from 'src/Entities/Usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from './hash.service';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    private hashService: HashService,
  ) {}

  async validateUserLogin(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { Usuario: loginDto.username },
    });

    if (!user) {
      throw new NotFoundException('Las credenciales no son correctas');
    }

    const isContrasena = this.hashService.comparePasswords(
      loginDto.password,
      user.Contrasena,
    );

    if (!isContrasena) {
      throw new NotFoundException('Las credenciales no son correctas');
    }

    return { message: 'succes' };
  }
}
