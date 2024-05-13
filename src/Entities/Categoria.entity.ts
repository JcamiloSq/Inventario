import {
    Column,
    Double,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity({ name: 'Categoria' })
  export class Categoria {
    @PrimaryGeneratedColumn()
    IdCategoria: number;
  
    @Column({ type: 'varchar' })
    NombreCategoria: string;
  
  }
  