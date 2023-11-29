import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { CitaService } from './citas.service';
import { CitaMedica } from './entities/citas';
import { CreateCitaDto } from './dto/create-cita.dto';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { MedicosService } from 'src/medicos/medicos.service';

@Controller('citas')
export class CitaController {
  constructor(
    private readonly citaService: CitaService,
    private readonly medicosService: MedicosService,
    private readonly pacientesService: PacientesService,
  ) {}

  @Post()
  async create(@Body() citaData: CreateCitaDto): Promise<CitaMedica> {
    return this.citaService.createCita({
      ...citaData,
      paciente: await this.pacientesService.findOne(citaData.pacienteId),
      medico: await this.medicosService.findOne(citaData.medicoId),
    });
  }

  @Get()
  async findAll(): Promise<CitaMedica[]> {
    return this.citaService.getCitas();
  }

  @Get('buscar')
  async findByPacienteIdAndFecha(
    @Query('pacienteId') pacienteId: number,
    @Query('fecha') fecha: string,
  ): Promise<CitaMedica[]> {
    return this.citaService.getCitasByPacienteIdAndFecha(
      pacienteId,
      new Date(fecha),
    );
  }

  @Put('actualizar-estado')
  async updateCitaState(
    @Body()
    {
      citaId,
      newState,
    }: {
      citaId: number;
      newState: 'ASISTIO' | 'NO ASISTIO';
    },
  ): Promise<CitaMedica> {
    return this.citaService.updateCitaState(citaId, newState);
  }
}
