// orden-medica.model.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CitaMedica } from './citas';

@Entity({ name: 'ordenes_medicas' })
export class OrdenMedica {
  @PrimaryGeneratedColumn()
  ordenId: number;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'timestamp' })
  fechaCaducidad: Date;

  @Column()
  especialidad: string;

  @ManyToOne(() => CitaMedica)
  @JoinColumn({ name: 'citaId' })
  cita: CitaMedica;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
