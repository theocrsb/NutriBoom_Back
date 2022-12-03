import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodDto } from './create-food.dto';

export class UpdateFoodDto {
  name: string;
  nombre_calories: number;
  lipides: number;
  glucides: number;
  proteines: number;
}
