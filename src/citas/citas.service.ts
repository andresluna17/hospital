import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CitaMedica } from './entities/citas';
import { OrdenMedica } from './entities/ordenes-medicas';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(CitaMedica)
    private readonly citaRepository: Repository<CitaMedica>,
    @InjectRepository(OrdenMedica)
    private readonly ordenMedicaRepository: Repository<OrdenMedica>,
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
    const startOfDay = new Date(fecha);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(fecha);
    endOfDay.setHours(23, 59, 59, 999);

    const existingCita = await this.citaRepository.findOne({
      where: { medico: { medicoId }, fecha: Between(startOfDay, endOfDay) },
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

  async createOrdenMedica(
    cita: CitaMedica,
    ordenData: Partial<OrdenMedica>,
  ): Promise<OrdenMedica> {
    const ordenMedica = this.ordenMedicaRepository.create(ordenData);
    ordenMedica.cita = cita;
    return await this.ordenMedicaRepository.save(ordenMedica);
  }
}
