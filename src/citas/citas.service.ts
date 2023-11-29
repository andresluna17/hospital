import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CitaMedica } from './entities/citas';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(CitaMedica)
    private readonly citaRepository: Repository<CitaMedica>,
  ) {}

  async createCita(citaData: Partial<CitaMedica>): Promise<CitaMedica> {
    const { medico, fecha } = citaData;

    const isMedicoAvailable = await this.isMedicoAvailable(
      medico.medicoId,
      fecha,
    );
    if (!isMedicoAvailable) {
      throw new ConflictException(
        'El médico no está disponible en la fecha deseada.',
      );
    }

    const cita = this.citaRepository.create(citaData);
    return await this.citaRepository.save(cita);
  }

  private async isMedicoAvailable(
    medicoId: number,
    fecha: Date,
  ): Promise<boolean> {
    const existingCita = await this.citaRepository.findOne({
      where: { medico: { medicoId }, fecha },
    });

    return !existingCita;
  }

  async getCitas(): Promise<CitaMedica[]> {
    return await this.citaRepository.find();
  }

  async getCitasByPacienteIdAndFecha(
    pacienteId: number,
    fecha: Date,
  ): Promise<CitaMedica[]> {
    return await this.citaRepository.find({
      where: { paciente: { pacienteId }, fecha },
    });
  }

  async updateCitaState(
    citaId: number,
    newState: 'ASISTIO' | 'NO ASISTIO',
  ): Promise<CitaMedica> {
    const cita = await this.citaRepository.findOne({
      where: {
        citaId,
      },
    });

    if (!cita) {
      throw new NotFoundException(`Cita médica con ID ${citaId} no encontrada`);
    }

    cita.estado = newState;
    cita.updatedAt = new Date();

    return await this.citaRepository.save(cita);
  }
}
