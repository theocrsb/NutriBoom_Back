import { IsEmail } from 'class-validator';

export class VerifUserDto {
  @IsEmail(
    {},
    {
      message: "Format d'email invalide",
    },
  )
  email: string;
}
