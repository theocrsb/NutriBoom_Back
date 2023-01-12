import { IsEmail } from 'class-validator';

export class VerifUserDto {
  @IsEmail()
  email: string;
}
