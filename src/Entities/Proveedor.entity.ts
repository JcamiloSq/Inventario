import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Proveedor' })
export class Proveedor {
  @PrimaryGeneratedColumn()
  IdProveedor: number;

  @Column({ type: 'varchar' })
  Nombre: string;

  @Column({ type: 'varchar' })
  Nit: string;

  @Column({ type: 'varchar' })
  Telefono: string;

  @Column({ type: 'varchar' })
  Email: string;

}