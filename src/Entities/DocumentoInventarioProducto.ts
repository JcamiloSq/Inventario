import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'documento_inventario_producto' })
export class DocumentoInventarioProducto {
  @PrimaryGeneratedColumn()
  IdInvProd: number;

  @Column({ type: 'bigint' })
  IdDocumento: number;

  @Column({ type: 'bigint' })
  IdProducto: string;

  @Column({ type: 'float' })
  Cantidad: number;

  @Column({ type: 'float' })
  PrecioUnitario: number;
}
