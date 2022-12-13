import { Users } from 'src/users/entities/user.entity';

export class UpdateEatenFoodDto {
  name: string;
  date: Date;
  quantity: number;
  users: Users;
}
