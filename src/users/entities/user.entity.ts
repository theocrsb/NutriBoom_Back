import { Activity } from 'src/activity/entities/activity.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id?: string = uuid();

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  lastname: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  firstname: string;

  @Column({
    nullable: false,
    type: 'int',
    width: 3,
  })
  age: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 10,
  })
  gender: string;

  @Column({
    nullable: false,
    type: 'int',
    width: 3,
  })
  weight: number;

  @Column({
    nullable: false,
    type: 'int',
    width: 6,
  })
  height: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  password: string;

  @ManyToMany(() => Activity, (acti) => acti.id, { eager: true })
    
  @JoinTable({
    name: 'user_activity',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'activityId',
      referencedColumnName: 'id',
    },
  })
  
}
