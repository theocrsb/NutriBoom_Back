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

  // ajout columun validate pour un activité ajouté par user
  @Column({
    nullable: false,
    type: 'boolean',
  })
  validate: boolean;

  // Ajout relation onetomany avec la table Users
  @OneToMany(() => Exercices, (exercices) => exercices.activity, {
    eager: false,
  })
  exercices: Exercices[];
}
