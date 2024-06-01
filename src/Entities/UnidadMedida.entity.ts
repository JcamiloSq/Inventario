import {
    Column,
     Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity({ name: 'UnidadMedida' })
  export class UnidadMedida {
    
    @PrimaryGeneratedColumn()
    IdUnidadMedida: number;
  
    @Column({ type: 'varchar' })
    NombreUnidadMedida: string;
    }
  
