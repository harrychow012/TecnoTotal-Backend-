import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reparacion } from '../../reparaciones/entities/reparaciones.entity';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn({ name: 'clientes_id' })
  clientes_id: number;

  @Column({ name: 'Nombre', type: 'varchar', length: 100 })
  Nombre: string;

  @Column({ name: 'Telefono', type: 'varchar', length: 15 })
  Telefono: string;

  @Column({ name: 'Direccion', type: 'varchar', length: 255 })
  Direccion: string;

  @Column({ name: 'Email', type: 'varchar', length: 100 })
  Email: string;

  @Column({ name: 'Historial_compras', type: 'text', nullable: true })
  Historial_compras?: string;

  @Column({ name: 'Historial_reparaciones', type: 'text', nullable: true })
  Historial_reparaciones?: string;

  @OneToMany(() => Reparacion, (reparacion) => reparacion.cliente)
  reparaciones: Reparacion[];
}
