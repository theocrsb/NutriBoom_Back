import { IsBoolean, IsNumber, IsString } from 'class-validator';
export class UpdateFoodDto {
  name: string;

  nombre_calories: number;

  lipides: number;

  glucides: number;

  proteines: number;

  validate: boolean;
}
