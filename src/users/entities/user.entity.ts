import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

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
    type: 'int',
    width: 6,
  })
  height: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  password: string;
}
