import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  lastname: string;
  firstname: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  email: string;
  password: string;
}
