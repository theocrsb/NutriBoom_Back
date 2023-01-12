import { IsBoolean, IsNumber, IsString } from 'class-validator';
export class UpdateFoodDto {
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
