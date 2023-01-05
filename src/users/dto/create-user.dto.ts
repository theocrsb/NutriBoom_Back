import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  NotEquals,
} from 'class-validator';
import { Activity } from 'src/activity/entities/activity.entity';
import { Exercices } from 'src/exercices/entities/exercice.entity';
import { Role } from 'src/role/entities/role.entity';

export class CreateUserDto {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  // transform pour retirer les espaces
  @MinLength(2, {
    message: ' Please enter at least 2 characters ',
  })
  lastname: string;
  //

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(2, {
    message: ' Please enter at least 2 characters ',
  })
  firstname: string;
  //

  @IsInt()
  // @Min(0)
  // @Max(150)
  age: number;
  //

  @MinLength(5, {
    message: ' Please enter at least 5 characters ',
  })
  gender: string;
  //

  @IsInt()
  weight: number;
  //

  @IsInt()
  height: number;
  //
  @IsInt()
  ratio: number;
  //

  @IsEmail()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  email: string;
  //

  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(4, {
    message: 'Please enter at least 4 characters',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password: string;
}
