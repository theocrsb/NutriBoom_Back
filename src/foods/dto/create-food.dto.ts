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
  @IsBoolean()
  validate: boolean;
}
