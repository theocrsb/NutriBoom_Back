import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Meals {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  date: string;

  @OneToMany(() => Users, (user) => user.meal)
  users: Users[];
}
