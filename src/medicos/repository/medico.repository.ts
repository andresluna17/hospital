import { UpdateMedicoDto } from '../dto/update-medico.dto';
import { CreateMedicoDto } from '../dto/create-medico.dto';
import { DataSource, Repository } from 'typeorm';
import { Medicos } from '../entities/medico.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MedicoRepository extends Repository<Medicos> {
  constructor(private dataSource: DataSource) {
    super(Medicos, dataSource.createEntityManager());
  }

  async findByEmail(email: string) {
    return await this.findOneBy({ email });
  }

  async saveOne(dto: CreateMedicoDto) {
    return await this.save(dto);
  }

  async findAll() {
    return await this.find();
  }

  async findById(id: number) {
    return await this.findById(id);
  }

  async updateOne(id: number, dto: UpdateMedicoDto) {
    return await this.update(id, dto);
  }

  async register(dto: { email: string; password: string }) {
    return await this.save(dto);
  }

  async removeOne(id: number) {
    return await this.delete(id);
  }
}
