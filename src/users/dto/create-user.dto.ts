import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  NotEquals,
} from 'class-validator';
import { Activity } from 'src/activity/entities/activity.entity';
import { Exercices } from 'src/exercices/entities/exercice.entity';
import { Role } from 'src/role/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @MinLength(2, {
    message: ' Veuillez saisir au moins 2 caractères',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  lastname: string;
  @IsString()
  @MinLength(2, {
    message: ' Veuillez saisir au moins 2 caractères ',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  firstname: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  @IsEmail()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  email: string;
  @IsString()
  @MinLength(4, {
    message: ' Veuillez saisir au moins 4 caractères pour le MDP ',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password: string;
  ratio: number;
  role?: Role;
}
