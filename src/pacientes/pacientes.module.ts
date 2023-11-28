import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { Paciente } from './entities/paciente.entity';
import { PacienteRepository } from './repository/paciente.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente])],
  exports: [TypeOrmModule, PacientesService],
  controllers: [PacientesController],
  providers: [PacientesService, PacienteRepository],
})
export class PacientesModule {}
