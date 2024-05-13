import {
    Column,
    Double,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity({ name: 'Producto' })
  export class Producto {
    @PrimaryGeneratedColumn()
    IdProducto: number;
  
    @Column({ type: 'varchar' })
    codigo: string;
  
    @Column({ type: 'varchar' })
    Precio: Double;
  
    @Column({ type: 'varchar' })
    Descripcion: string;
  
    @Column({ type: 'bigint' })
    IdCategoria: number;
  
  }
  