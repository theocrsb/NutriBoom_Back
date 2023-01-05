import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Activity } from 'src/activity/entities/activity.entity';
import { Role } from 'src/role/entities/role.entity';
export class UpdateUserDto {
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  // transform pour retirer les espaces
  @MinLength(2, {
    message: ' Please enter at least 2 characters ',
  })
  lastname?: string;
  //
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(2, {
    message: ' Please enter at least 2 characters ',
  })
  firstname?: string;
  //
  @IsOptional()
  @IsInt()
  @Min(0, { message: 'age cannot be less than 0' })
  @Max(150, { message: 'age cannot be greater than 150' })
  age?: number;
  //
  @IsOptional()
  @MinLength(5, {
    message: ' Please enter at least 5 characters ',
  })
  gender?: string;
  //
  @IsOptional()
  @IsInt()
  weight?: number;
  //
  @IsOptional()
  @IsInt()
  height?: number;
  //
  @IsOptional()
  @IsInt()
  ratio?: number;
  //
  @IsOptional()
  @IsEmail()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  email?: string;
  //
  @IsOptional()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(4, {
    message: 'Please enter at least 4 characters',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password?: string;
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
