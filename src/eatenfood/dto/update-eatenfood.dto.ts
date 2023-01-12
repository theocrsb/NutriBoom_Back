import { IsNumber, IsString } from 'class-validator';
import { Users } from 'src/users/entities/user.entity';

export class UpdateEatenFoodDto {
  @IsString()
  name: string;
  @IsNumber()
  quantity: number;
  users: Users;
}
