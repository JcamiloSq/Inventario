import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity({ name: 'Rol' })
  export class Rol {
    
    @PrimaryGeneratedColumn()
    IdRol: number;
  
     @Column({ type: 'varchar' })
    NombreRol: string;
    }