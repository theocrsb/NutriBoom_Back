import { Exercices } from 'src/exercices/entities/exercice.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  conso_cal: number;

  // Ajout relation onetomany avec la table Users
  @OneToMany(() => Exercices, (exercices) => exercices.activity)
  exercices!: Exercices[];
  // Users: Users[];
}
