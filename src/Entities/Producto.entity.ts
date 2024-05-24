import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Producto' })
export class Producto {
  @PrimaryGeneratedColumn()
  IdProducto: number;

  @Column({ type: 'varchar' })
  codigo: string;

  @Column({ type: 'float' })
  Precio: number;

  @Column({ type: 'varchar' })
  Descripcion: string;

  @Column({ type: 'bigint' })
  IdCategoria: number;
}
