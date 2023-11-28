import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateMedicoDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
