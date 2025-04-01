import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tecnicos')
export class Tecnico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefono: string;

  @Column()
  especialidad: string;

  @Column({ default: true })
  activo: boolean;
}