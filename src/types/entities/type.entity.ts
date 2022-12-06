import { Meals } from 'src/meals/entities/meal.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  name: string;

  @OneToMany(() => Meals, (meal) => meal.id)
  meals: Meals[];

  //@ManyToOne(() => Meals, (meal) => meal.id, { eager:true })
  //meals: Meals[];
}
