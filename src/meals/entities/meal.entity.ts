import { Food } from 'src/foods/entities/food.entity';
import { Type } from 'src/types/entities/type.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Column({
    nullable: false,
    type: 'int',
    width: 10,
  })
  quantity: number;

  @ManyToOne(() => Users, (user) => user.meals)
  users: Users;

  @ManyToOne(() => Type, (type) => type.meals)
  types: Type;

  @ManyToMany(() => Food, { eager: true })
  @JoinTable()
  food: Food[];
}
