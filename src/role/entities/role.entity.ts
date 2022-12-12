import { Users } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  static Admin(Admin: any) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 20,
  })
  label: string;

  @OneToMany(() => Users, (user) => user.role)
  users: Users[];
}
