import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MailTo {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  name!: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  mail!: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  texteArea!: string;
}
