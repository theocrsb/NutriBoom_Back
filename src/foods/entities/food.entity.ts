import { Meals } from 'src/meals/entities/meal.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Food {
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
    type: 'int',
    width: 10,
  })
  nombre_calories: number;

  @Column({
    nullable: false,
    type: 'int',
    width: 10,
  })
  lipides: number;

  @Column({
    nullable: false,
    type: 'int',
    width: 10,
  })
  glucides: number;

  @Column({
    nullable: false,
    type: 'int',
    width: 10,
  })
  proteines: number;

  @ManyToMany((type) => Meals)
  meals: Meals[];
}
