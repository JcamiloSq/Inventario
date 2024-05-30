import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'FacturaProducto' })
export class FacturaProducto {
  @PrimaryGeneratedColumn()
  IdFacProducto: number;

  @Column({ type: 'bigint' })
  IdFacturaVenta: number;

  @Column({ type: 'bigint' })
  IdProducto: number;

  @Column({ type: 'float' })
  Cantidad: number;

  @Column({ type: 'float' })
  PrecioUnitario: number;
}
