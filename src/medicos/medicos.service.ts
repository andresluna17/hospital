import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { Medicos } from './entities/medico.entity';
import { MedicoRepository } from './repository/medico.repository';

@Injectable()
export class MedicosService {
  constructor(private medicosRepository: MedicoRepository) {}

  async create(createMedicoDto: CreateMedicoDto) {
    const hash = await this.hashPassword(createMedicoDto.password);
    createMedicoDto.password = hash;
    return await this.medicosRepository.saveOne(createMedicoDto);
  }

  async findOneByEmail(email: string): Promise<Medicos | undefined> {
    return this.medicosRepository.findOneBy({ email: email });
  }

  async findAll() {
    return await this.medicosRepository.find();
  }

  async findOne(id: number) {
    return await this.medicosRepository.findOneBy({ medicoId: id });
  }

  async update(id: number, updateMedicoDto: UpdateMedicoDto) {
    return await this.medicosRepository.update(id, updateMedicoDto);
  }

  async remove(id: number) {
    return await this.medicosRepository.delete(id);
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }
}
