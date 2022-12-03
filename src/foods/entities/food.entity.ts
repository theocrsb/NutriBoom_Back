import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    type: 'int',
    width: 10,
  })
  nombre_calories: number;

  @Column({
    nullable: false,
    type: 'int',
    width: 10,
  })
  lipides: number;

  @Column({
    nullable: false,
    type: 'int',
    width: 10,
  })
  glucides: number;

  @Column({
    nullable: false,
    type: 'int',
    width: 10,
  })
  proteines: number;
}
