import { Meals } from 'src/meals/entities/meal.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Meals, (meal) => meal.id)
  meals: Meals[];
}
