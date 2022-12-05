import { Activity } from 'src/activity/entities/activity.entity';
import { Users } from 'src/users/entities/user.entity';

export class CreateExerciceDto {
  id?: number;
  activity: Activity;
  users: Users;
  // kcalSpend est une fonction qui calcule les calories depensés
  // en fonction de l'activité ainsi que sa durée. Cette fonction
  // sera crée dans la partie front et renvoyer via un post
  kcalSpend: number;
}
