import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateOrdenMedicaDto {
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsDateString()
  fechaCaducidad: Date;

  @IsNotEmpty()
  @IsString()
  especialidad: string;

  @IsNotEmpty()
  citaId: number;
}
