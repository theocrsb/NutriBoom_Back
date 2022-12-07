import { EatenFood } from 'src/eatenfood/entities/eatenfood.entity';
import { Exercices } from 'src/exercices/entities/exercice.entity';

import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id?: string = uuid();

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  lastname: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  firstname: string;

  @Column({
    nullable: false,
    type: 'int',
    width: 3,
  })
  age: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 10,
  })
  gender: string;

  @Column({
    nullable: false,
    type: 'int',
    width: 3,
  })
  weight: number;

  @Column({
    nullable: false,
    type: 'decimal',
    width: 6,
  })
  height: number;

  @Column({
    nullable: false,
    type: 'decimal',
    width: 6,
  })
  ratio: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  password: string;

  @OneToMany(() => Exercices, (exercices) => exercices.users, { eager: true })
  exercices!: Exercices[];

  @OneToMany(() => EatenFood, (eatenfood) => eatenfood.users, { eager: true })
  eatenfood: EatenFood[];

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role;
}
