import { Activity } from 'src/activity/entities/activity.entity';
import { Exercices } from '../entities/user.entity';

export class UpdateUserDto {
  lastname?: string;
  firstname?: string;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  email?: string;
  password?: string;
  Activity?: Activity[];
}
