import { Exercices } from 'src/exercices/entities/exercice.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
    type: 'int',
    width: 6,
  })
  height: number;

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

  @OneToMany(() => Exercices, (exercices) => exercices.users)
  public exercices!: Exercices[];

  // @OneToMany(() => Activity, (acti) => acti.id, { eager: true })
  // @JoinTable({
  //   name: 'exercices',
  //   joinColumn: {
  //     name: 'userId',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'activityId',
  //     referencedColumnName: 'id',
  //   },
  // })
  // Activity: Activity[];
}

// @Entity('exercices')
// penser a mettre nullable true pour les exercices
// export class Exercices {
//   @PrimaryGeneratedColumn()
//   public exercicesId!: number;

//   @CreateDateColumn({ type: 'timestamp' })
//   public createdAt!: Date;

//   @UpdateDateColumn({ type: 'timestamp' })
//   public updatedAt!: Date;

//   // @Column('uuid')
//   // @PrimaryColumn()
//   //
//   @Column()
//   public userId!: string;

//   // @PrimaryColumn()
//   //
//   @Column()
//   public activityId!: number;

//   @ManyToOne(() => Activity, (acti) => acti.id)
//   public Activity!: Activity;

//   @ManyToOne(() => Users, (users) => users.id)
//   public Users!: Users;
// }
