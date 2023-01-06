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
} from 'class-validator';
import { Activity } from 'src/activity/entities/activity.entity';
import { Role } from 'src/role/entities/role.entity';
export class UpdateUserDto {
  //
  //AJOUT DES TRIM DANS LE FRONT POUR GESTION DES ESPACES
  //
  @IsOptional()
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
  @IsOptional()
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

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(150)
  age: number;
  //

  @IsOptional()
  @IsString()
  @MaxLength(5, {
    message: ' Please enter a maximum of 5 characters ',
  })
  @MinLength(5, {
    message: ' Please enter at least 5 characters ',
  })
  gender: string;
  //

  @IsOptional()
  @IsNumber()
  @Min(30)
  @Max(300)
  weight: number;
  //

  @IsOptional()
  @IsNumber()
  @Min(10)
  @Max(500)
  height: number;
  //

  @IsOptional()
  @Min(0.1)
  @Max(10)
  @IsNumber()
  ratio: number;
  //

  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;
  //

  @IsOptional()
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
  // //
  @IsOptional()
  //ajouter class validator pour type activity
  Activity?: Activity[];
  // //
  @IsOptional()
  //ajouter class validator pour type role
  role?: Role;
  // //
}
