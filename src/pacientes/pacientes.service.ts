import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { PacienteRepository } from './repository/paciente.repository';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Injectable()
export class PacientesService {
  constructor(private pacienteRepository: PacienteRepository) {}

  async create(createMedicoDto: CreatePacienteDto) {
    return await this.pacienteRepository.saveOne(createMedicoDto);
  }

  async findOneByEmail(email: string): Promise<Paciente | undefined> {
    return this.pacienteRepository.findOneBy({ email: email });
  }

  async findAll() {
    return await this.pacienteRepository.find();
  }

  async findOne(id: number) {
    return await this.pacienteRepository.findOneBy({ pacienteId: id });
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    return await this.pacienteRepository.update(id, updatePacienteDto);
  }

  async remove(id: number) {
    return await this.pacienteRepository.delete(id);
  }
}
