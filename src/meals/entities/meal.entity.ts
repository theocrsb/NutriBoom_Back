import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meals {
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
    type: 'varchar',
    length: 50,
  })
  date: string;
}
