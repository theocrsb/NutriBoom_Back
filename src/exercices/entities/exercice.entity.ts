import { Activity } from 'src/activity/entities/activity.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Exercices {
  @PrimaryGeneratedColumn()
  public id!: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  // @Column('uuid')
  // @PrimaryColumn()
  //
  @Column()
  public userId!: string;

  // @PrimaryColumn()
  //
  @Column()
  public activityId!: number;

  @ManyToOne(() => Activity, (acti) => acti.id)
  public activity!: Activity;

  @ManyToOne(() => Users, (users) => users.id)
  public users!: Users;
}
