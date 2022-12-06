import { Exercices } from 'src/exercices/entities/exercice.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Activity {
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
  conso_cal_1h: number;

  // @Column({
  //   nullable: false,
  //   type: 'int',
  //   width: 100,
  // })
  // time_minutes: number;

  // Ajout relation onetomany avec la table Users
  //Many correspond a Activity
  @ManyToOne(() => Exercices, (exercices) => exercices.activity)
  exercices!: Exercices[];
}
