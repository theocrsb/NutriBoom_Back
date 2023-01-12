import { IsNumber, IsString } from 'class-validator';
import { Food } from 'src/foods/entities/food.entity';
import { Type } from 'src/types/entities/type.entity';
import { Users } from 'src/users/entities/user.entity';

export class CreateEatenFoodDto {
  @IsString()
  name: string;
  @IsNumber()
  quantity: number;
  users: Users;
  type?: Type;
  food?: Food;
}
