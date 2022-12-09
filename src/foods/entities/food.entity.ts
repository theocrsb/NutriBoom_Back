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
}
