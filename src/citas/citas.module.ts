import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CitaMedica } from './entities/citas';
import { CitaService } from './citas.service';
import { CitaController } from './citas.controller';
import { MedicosModule } from 'src/medicos/medicos.module';
import { PacientesModule } from 'src/pacientes/pacientes.module';
import { OrdenMedica } from './entities/ordenes-medicas';

@Module({
  imports: [
    TypeOrmModule.forFeature([CitaMedica, OrdenMedica]),
    PacientesModule,
    MedicosModule,
  ],
  exports: [TypeOrmModule, CitaService],
  controllers: [CitaController],
  providers: [CitaService],
})
export class CitasModule {}
