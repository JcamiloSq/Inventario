import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn()
  IdUsuario: number;

  @Column({ type: 'varchar' })
  NombreUsuario: string;

  @Column({ type: 'varchar' })
  Contrasena: string;

  @Column({ type: 'bigint' })
  Rol: string;

  @Column({ type: 'varchar' })
  Email: string;

  @CreateDateColumn()
  createdDate: Date;
}
