import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Stock' })
export class Stock {
  @PrimaryGeneratedColumn()
  IdStock: number;

  @Column({ type: 'bigint' })
  IdProducto: string;

  @Column({ type: 'float' })
  Cantidad: number;

  @Column({ type: 'varchar' })
  Proveedor: string;
}
