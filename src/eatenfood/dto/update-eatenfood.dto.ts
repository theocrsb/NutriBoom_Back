import { IsNumber, IsString } from 'class-validator';
import { Users } from 'src/users/entities/user.entity';

export class UpdateEatenFoodDto {
  name: string;
  quantity: number;
  users: Users;
}
