import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashService } from './hash.service';
import { Usuario } from 'src/Entities/Usuario.entity';
import { UsuarioDto } from '../Dto/usuario.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: UsuarioDto): Promise<Usuario> {
    const hashedPassword = await this.hashService.hashPassword(
      createUserDto.Contrasena,
    );
    const newUser = this.userRepository.create({
      ...createUserDto,
      Contrasena: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }
}
