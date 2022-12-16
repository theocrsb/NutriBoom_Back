import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Activity } from 'src/activity/entities/activity.entity';
import { Exercices } from 'src/exercices/entities/exercice.entity';
import { Role } from 'src/role/entities/role.entity';
//ajout des decorateurs depuis 'class-validator' pour gerer les formulaire
export class CreateUserDto {
  lastname: string;
  firstname: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must have 1 lower case letter, 1 upper case letter and 1 number or special character',
  })
  password: string;
  ratio: number;
  role?: Role;
}
