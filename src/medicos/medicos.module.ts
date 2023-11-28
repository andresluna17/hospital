import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';
import { Medicos } from './entities/medico.entity';
import { MedicoRepository } from './repository/medico.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Medicos])],
  exports: [TypeOrmModule, MedicosService],
  controllers: [MedicosController],
  providers: [MedicosService, MedicoRepository],
})
export class MedicosModule {}
