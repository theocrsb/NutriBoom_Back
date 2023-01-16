import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateFoodDto {
  name: string;

  nombre_calories: number;

  lipides: number;

  glucides: number;

  proteines: number;

  validate: boolean;
}
