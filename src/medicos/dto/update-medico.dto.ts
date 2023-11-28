import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicoDto } from './create-medico.dto';

export class UpdateMedicoDto extends PartialType(CreateMedicoDto) {
  id?: number;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  professional_card_number?: number;
  hashdRt?: string;
}
