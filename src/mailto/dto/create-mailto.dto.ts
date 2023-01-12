import { IsEmail, IsString } from 'class-validator';
import { MailTo } from '../entities/mailto.entity';

export class CreateMailtoDto {
  // createdAt?: Date;
  @IsString()
  name?: string;
  @IsString()
  @IsEmail()
  mail?: string;
  @IsString()
  texteArea?: string;
}
