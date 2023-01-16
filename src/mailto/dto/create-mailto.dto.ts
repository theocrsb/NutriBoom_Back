import { IsEmail, IsString } from 'class-validator';
import { MailTo } from '../entities/mailto.entity';

export class CreateMailtoDto {
  // createdAt?: Date;
  name: string;
  mail: string;
  texteArea: string;
}
