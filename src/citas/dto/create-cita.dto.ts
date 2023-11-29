import { IsDateString, IsNumber } from 'class-validator';

export class CreateCitaDto {
  @IsDateString()
  fecha;
  @IsNumber()
  medicoId;
  @IsNumber()
  pacienteId;
}
