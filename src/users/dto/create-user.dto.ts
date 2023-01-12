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
  @Matches(/^[A-Za-z]*$/, {
    message: "*Le nom ne doit pas contenir d'espace",
  })
  @MinLength(1, {
    message: ' *Le nom doit contenir au moins un caractère ',
  })
  lastname: string;
  //
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z]*$/, {
    message: "*Le prénom ne doit pas contenir d'espace",
  })
  @MinLength(2, {
    message: ' *Le prénom doit contenir au moins deux caractères',
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
    message: '*Tu ne peux rentrer plus de 5 caractères ',
  })
  @MinLength(5, {
    message: ' *Tu dois rentrer au moins 5 caractères ',
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

  @IsEmail(
    {},
    {
      message: "Format d'email invalide",
    },
  )
  @IsString()
  email: string;
  //

  @IsString()
  @MinLength(4, {
    message: '*Le mot de passe doit contenir au moins 4 caractères',
  })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
    message:
      '*Le mot de passe doit contenir une majuscule, une minuscule et un nombre',
  })
  // @Transform(({ value }: TransformFnParams) => value?.trim())
  password: string;
}
