import { EatenFood } from 'src/eatenfood/entities/eatenfood.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  name: string;

  @OneToMany(() => EatenFood, (eatenfood) => eatenfood.type, { eager: false })
  eatenfood: EatenFood[];
}
