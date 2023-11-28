import {
  IsEmail,
  IsString,
  MinLength,
  IsNumber,
  MaxLength,
} from 'class-validator';

export class CreatePacienteDto {
  @IsNumber()
  id: number;

  @IsEmail()
  @MaxLength(200)
  email: string;

  @IsString()
  @MaxLength(90)
  first_name?: string;

  @IsString()
  @MaxLength(90)
  last_name?: string;

  @IsString()
  @MaxLength(20)
  phone?: string;

  @MaxLength(200)
  @IsString()
  address?: string;

  @IsString()
  @MaxLength(90)
  city?: string;
}
