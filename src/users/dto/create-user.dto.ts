import { Activity } from 'src/activity/entities/activity.entity';
import { Exercices } from 'src/exercices/entities/exercice.entity';
import { Role } from 'src/role/entities/role.entity';

export class CreateUserDto {
  lastname: string;
  firstname: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  email: string;
  password: string;
  ratio: number;
  role: Role;
}
