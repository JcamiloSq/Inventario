import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'FacturaVenta' })
export class FacturaVenta {
  @PrimaryGeneratedColumn()
  IdFacturaVenta: number;

  @Column({ type: 'varchar' })
  DocumentoReferencia: string;

  @Column({ type: 'date' })
  Fecha: Date;

  @Column({ type: 'float' })
  Total: number;

  @Column({ type: 'varchar' })
  Cliente: string;

  @Column({ type: 'varchar' })
  Correo: string;

  @Column({ type: 'varchar' })
  Observacion: string;

  @Column({ type: 'varchar' })
  Estado: string;
}
