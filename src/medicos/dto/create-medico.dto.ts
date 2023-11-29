import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMedicoDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

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

  @IsNumber()
  professional_card_number?: number;
}
