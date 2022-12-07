import { Activity } from 'src/activity/entities/activity.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Exercices {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  // @UpdateDateColumn({ type: 'timestamp' })
  // updatedAt!: Date;

  @Column()
  time!: number;

  @ManyToOne(() => Activity, (acti) => acti.exercices)
  activity!: Activity;

  @ManyToOne(() => Users, (users) => users.exercices)
  users!: Users;
}
