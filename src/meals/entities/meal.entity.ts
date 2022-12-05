import { Food } from 'src/foods/entities/food.entity';
import { Type } from 'src/types/entities/type.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
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

  // @OneToMany(() => Users, (user) => user.meal)
  // users!: Users[];

  //   @ManyToOne(() => Food, (food) => food.id)
  //   foods!: Food[];
  //

  @OneToMany(() => Users, (user) => user.id)
  users: Users;

  @OneToMany(() => Type, (type) => type.id)
  types: Type;
}
