import { Activity } from 'src/activity/entities/activity.entity';
import { Users } from 'src/users/entities/user.entity';

export class CreateExerciceDto {
  id?: number;
  activity: Activity;
  time: number;
}
