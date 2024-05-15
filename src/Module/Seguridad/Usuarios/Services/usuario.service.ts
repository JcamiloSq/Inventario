import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { HashService } from './hash.service';
import { Usuario } from 'src/Entities/Usuario.entity';
import { UsuarioDto } from '../Dto/usuario.dto';
import { Rol } from 'src/Entities/Rol.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly hashService: HashService,
    private dataSource: DataSource,
  ) {}

  async crearUsuario(createUserDto: UsuarioDto): Promise<Usuario> {
    const hashedPassword = await this.hashService.hashPassword(
      createUserDto.Contrasena,
    );
    const newUser = this.usuarioRepository.create({
      ...createUserDto,
      Contrasena: hashedPassword,
    });

    return this.usuarioRepository.save(newUser);
  }

  async obtenerUsuarios() {
    return await this.dataSource
      .createQueryBuilder(Usuario, 'u')
      .select([
        'u.IdUsuario as IdUsuario',
        'u.Usuario as Usuario',
        'u.NombreCompleto as NombreCompleto',
        'u.Contrasena as Contrasena',
        'u.IdRol as IdRol',
        'u.Email as Email',
        'u.FechaRegistro as FechaRegistro',
        'r.NombreRol as NombreRol',
      ])
      .leftJoin('Rol', 'r', 'u.IdRol = r.IdRol')
      .getRawMany();
  }

  async actualizarUsuario(id: number, updateDto: UsuarioDto) {
    const usuario = await this.usuarioRepository.findOneBy({ IdUsuario: id });

    if (!usuario) {
      throw new NotFoundException(`No se encontró el usauri con ID: ${id}`);
    }

    const actualizarUsuario = this.usuarioRepository.merge(usuario, updateDto);

    return await this.usuarioRepository.save(actualizarUsuario);
  }

  async obtenerRoles() {
    return await this.dataSource
      .createQueryBuilder(Rol, 'r')
      .select(['IdRol as value', 'NombreRol as label'])
      .getRawMany();
  }

  async obtenerUsuarioPorId(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ IdUsuario: id });

    if (!usuario) {
      throw new NotFoundException(`No se encontró el usauri con ID: ${id}`);
    }

    return usuario;
  }

  async eliminarUsuario(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ IdUsuario: id });

    if (!usuario) {
      throw new NotFoundException(`No se encontró el usauri con ID: ${id}`);
    }

    return await this.usuarioRepository.delete({ IdUsuario: id });
  }
}
