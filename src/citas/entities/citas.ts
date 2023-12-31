import { Medicos } from 'src/medicos/entities/medico.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { OrdenMedica } from './ordenes-medicas';

@Entity({ name: 'citas_medicas' })
export class CitaMedica {
  @PrimaryGeneratedColumn()
  citaId: number;

  @Index()
  @Column({ type: 'timestamp' })
  fecha: Date;

  @ManyToOne(() => Medicos, { eager: true })
  @JoinColumn({ name: 'medicoId' })
  medico: Medicos;

  @ManyToOne(() => Paciente, { eager: true })
  @JoinColumn({ name: 'pacienteId' })
  paciente: Paciente;

  @OneToMany(() => OrdenMedica, (orden) => orden.cita, {
    eager: true,
    cascade: true,
  })
  ordenesMedicas: OrdenMedica[];

  @Column({ default: 'PROGRAMADA' })
  estado: 'PROGRAMADA' | 'ASISTIO' | 'NO ASISTIO';

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
