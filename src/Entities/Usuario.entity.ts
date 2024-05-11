import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Usuario' })
export class Usuario {
  @PrimaryGeneratedColumn()
  IdUsuario: number;

  @Column({ type: 'varchar' })
  Usuario: string;

  @Column({ type: 'varchar' })
  NombreCompleto: string;

  @Column({ type: 'varchar' })
  Contrasena: string;

  @Column({ type: 'bigint' })
  Rol: string;

  @Column({ type: 'varchar' })
  Email: string;

  @CreateDateColumn()
  FechaRegistro: Date;
}
