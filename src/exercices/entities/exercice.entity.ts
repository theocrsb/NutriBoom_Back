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

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  // @Column('uuid')
  // @PrimaryColumn()
  //
  // @Column()
  // userId!: string;

  // // @PrimaryColumn()
  // //
  // @Column()
  // activityId!: number;

  @ManyToOne(() => Activity, (acti) => acti.id)
  activity!: Activity;

  @ManyToOne(() => Users, (users) => users.id)
  users!: Users;
}
