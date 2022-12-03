import { Activity } from 'src/activity/entities/activity.entity';
import { Users } from 'src/users/entities/user.entity';

export class CreateExerciceDto {
  id?: number;

  createdAt?: Date;

  updatedAt?: Date;

  userId?: string;

  activityId?: number;

  activity?: Activity;

  users?: Users;
}
