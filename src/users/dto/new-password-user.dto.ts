import { IsString, Matches, MinLength } from 'class-validator';

export class NewPasswordDto {
  @IsString()
  @MinLength(4, {
    message: '*Le mot de passe doit contenir au moins 4 caractères',
  })
  @Matches(/^(?=.[A-Z])(?=.[a-z])(?=.*[0-9])/, {
    message:
      '*Le mot de passe doit contenir une majuscule, une minuscule et un nombre',
  })
  password: string;
  token: string;
}
