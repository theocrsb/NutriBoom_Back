import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  NotEquals,
} from 'class-validator';
import { Activity } from 'src/activity/entities/activity.entity';
import { Exercices } from 'src/exercices/entities/exercice.entity';
import { Role } from 'src/role/entities/role.entity';

export class CreateUserDto {
  //
  //AJOUT DES TRIM DANS LE FRONT POUR GESTION DES ESPACES
  //
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-zÀ-ÿ]+[A-Za-zÀ-ÿ ]*$/, {
    message: 'Please enter letters without spaces at the beginning',
  })
  @MinLength(1, {
    message: ' Please enter at least 1 characters ',
  })
  lastname: string;
  //
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-zÀ-ÿ]+[A-Za-zÀ-ÿ ]*$/, {
    message: 'Please enter letters without spaces at the beginning',
  })
  @MinLength(2, {
    message: ' Please enter at least 2 characters ',
  })
  firstname: string;
  //

  @IsInt()
  @Min(1)
  @Max(150)
  age: number;
  //
  @IsString()
  @MaxLength(5, {
    message: ' Please enter a maximum of 5 characters ',
  })
  @MinLength(5, {
    message: ' Please enter at least 5 characters ',
  })
  gender: string;
  //

  @IsNumber()
  @Min(30)
  @Max(300)
  weight: number;
  //

  @IsNumber()
  @Min(0.5)
  @Max(500)
  height: number;
  //
  @Min(0.1)
  @Max(10)
  @IsNumber()
  ratio: number;
  //

  @IsEmail()
  @IsString()
  email: string;
  //

  @IsString()
  @MinLength(4, {
    message: 'Please enter at least 4 characters',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must have 1 lower case letter, 1 upper case letter and 1 number or special character',
  })
  // @Transform(({ value }: TransformFnParams) => value?.trim())
  password: string;
}
