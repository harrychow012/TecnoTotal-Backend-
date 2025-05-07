import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reparacion } from '../../reparaciones/entities/reparaciones.entity';

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

  @OneToMany(() => Reparacion, (reparacion) => reparacion.tecnicoAsignado)
  reparaciones: Reparacion[]; // Relación con la entidad Reparacion
}
