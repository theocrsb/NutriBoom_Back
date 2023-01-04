import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Activity } from 'src/activity/entities/activity.entity';
import { Role } from 'src/role/entities/role.entity';
export class UpdateUserDto {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  lastname?: string;
  @Transform(({ value }: TransformFnParams) => value?.trim())
  firstname?: string;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  @IsEmail()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  email?: string;
  @IsString()
  @MinLength(4, {
    message: 'Veuillez saisir au moins 4 caractère',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password?: string;
  Activity?: Activity[];
  role?: Role;
}
