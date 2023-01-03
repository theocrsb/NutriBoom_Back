import { EatenFood } from 'src/eatenfood/entities/eatenfood.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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
    type: 'float',
  })
  nombre_calories: number;

  @Column({
    nullable: false,
    type: 'float',
  })
  lipides: number;

  @Column({
    nullable: false,
    type: 'float',
  })
  glucides: number;

  @Column({
    nullable: false,
    type: 'float',
  })
  proteines: number;

  // ajout columun validate pour un aliment ajouté par user
  @Column({
    nullable: false,
    type: 'boolean',
  })
  validate: boolean;

  @OneToMany(() => EatenFood, (eatenfood) => eatenfood.food, { eager: false })
  eatenfood: EatenFood[];
}
