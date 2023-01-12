import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  name: string;
  @IsNumber()
  nombre_calories: number;
  @IsNumber()
  lipides: number;
  @IsNumber()
  glucides: number;
  @IsNumber()
  proteines: number;
  // Ajout en Brut dans le Front
  validate: boolean;
}
