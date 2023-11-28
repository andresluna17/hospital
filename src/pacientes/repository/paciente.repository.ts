import { UpdatePacienteDto } from '../dto/update-paciente.dto';
import { CreatePacienteDto } from '../dto/create-paciente.dto';
import { DataSource, Repository } from 'typeorm';
import { Paciente } from '../entities/paciente.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PacienteRepository extends Repository<Paciente> {
  constructor(private dataSource: DataSource) {
    super(Paciente, dataSource.createEntityManager());
  }

  async findByEmail(email: string) {
    return await this.findOneBy({ email });
  }

  async saveOne(dto: CreatePacienteDto) {
    return await this.save(dto);
  }

  async findAll() {
    return await this.find();
  }

  async findById(id: number) {
    return await this.findById(id);
  }

  async updateOne(id: number, dto: UpdatePacienteDto) {
    return await this.update(id, dto);
  }

  async register(dto: { email: string; password: string }) {
    return await this.save(dto);
  }

  async removeOne(id: number) {
    return await this.delete(id);
  }
}
