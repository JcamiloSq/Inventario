import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'documento_inventario' })
export class DocumentoInventario {
  @PrimaryGeneratedColumn()
  IdDocumento: number;

  @Column({ type: 'varchar' })
  Proveedor: string;

  @Column({ type: 'varchar' })
  DocumentoReferencia: string;

  @Column({ type: 'varchar' })
  TipoDocumento: string;

  @Column({ type: 'varchar' })
  Observacion: string;

  @Column({ type: 'varchar' })
  Estado: string;
}
