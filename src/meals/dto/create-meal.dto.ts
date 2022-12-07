import { Food } from 'src/foods/entities/food.entity';
import { Type } from 'src/types/entities/type.entity';
import { Users } from 'src/users/entities/user.entity';

export class CreateMealDto {
  name: string;
  quantity: number;
  users: Users;
  types: Type;
  food: Food[];
}
