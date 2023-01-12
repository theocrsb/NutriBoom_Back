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
  @IsNotEmpty()
  @Matches(/^[A-Za-z]*$/, {
    message: "*Le nom ne doit pas contenir d'espace",
  })
  @MinLength(1, {
    message: ' *Le nom doit contenir au moins un caractère ',
  })
  lastname: string;
  //
  @IsOptional()
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

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(150)
  age: number;
  //

  @IsOptional()
  @IsString()
  @MaxLength(5, {
    message: '*Tu ne peux rentrer plus de 5 caractères ',
  })
  @MinLength(5, {
    message: ' *Tu dois rentrer au moins 5 caractères ',
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
  @IsEmail(
    {},
    {
      message: "Format d'email invalide",
    },
  )
  @IsString()
  email: string;
  //

  @IsOptional()
  @IsString()
  @MinLength(4, {
    message: '*Le mot de passe doit contenir au moins 4 caractères',
  })
  @Matches(/^^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
    message:
      '*Le mot de passe doit contenir une majuscule, une minuscule et un nombre',
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
