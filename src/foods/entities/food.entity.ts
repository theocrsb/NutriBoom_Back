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

  @OneToMany(() => EatenFood, (eatenfood) => eatenfood.type, { eager: false })
  eatenfood: EatenFood[];
}
