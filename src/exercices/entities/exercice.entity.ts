import { Activity } from 'src/activity/entities/activity.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Exercices {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Column()
  time!: number;

  @ManyToOne(() => Activity, (acti) => acti.exercices, {
    eager: true,
  })
  activity!: Activity;

  @ManyToOne(() => Users, (users) => users.exercices, {
    eager: false,
    onDelete: 'CASCADE',
  })
  users!: Users;
}
