import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cliente') // Nombre de la tabla
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'date' })
  dateOfBirth: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
