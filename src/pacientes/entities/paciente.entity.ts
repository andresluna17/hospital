import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'pacientes' })
export class Paciente {
  @PrimaryGeneratedColumn()
  pacienteId: number;

  @Column({ type: 'varchar', length: 20 })
  id: number;

  @Index()
  @Column({ nullable: true })
  first_name: string;

  @Index()
  @Column({ default: null, nullable: true })
  last_name: string;

  @Index()
  @Column({ default: null })
  phone: string;

  @Index()
  @Column({ default: null })
  address: string;

  @Index()
  @Column({ default: null })
  city: string;

  @Index()
  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
