import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // Ajout constructor pour interagir avec la table Users
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  // Ajout constructor pour interagir avec la table role

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const roleUser = await this.roleRepository.findOneBy({ label: 'user' });
    // const roleUserString = roleUser.label;
    console.log('roleUser ', roleUser);
    const userCreate = await this.userRepository.save(createUserDto);
    console.log(userCreate);
    userCreate.role = roleUser;
    if (userCreate.role.label !== 'user') {
      throw new NotFoundException(`Pas un user !!!`);
    }
    console.log('apres MAJ .role', userCreate);
    const saltOrRounds = 10;
    const password = userCreate.password;
    console.log('password: ', password);
    const hash = await bcrypt.hash(password, saltOrRounds);
    console.log('hash: ', hash);
    userCreate.password = hash;
    console.log('user create password: ', userCreate.password);
    // const salt = await bcrypt.genSalt();

    // const userInstance = new Users();
    // console.log('userInstance', userInstance);
    // userInstance.role = roleUser[0];
    // console.log('roleUser', roleUser[0]);

    // 1 - recuperer objet role . user classique (via repository)
    // 2- creer une instance de user a l'aide du repo user
    // 3- update l'instance de user pour modifier sa proprieter role avec ce qui a ete recuperer a l'etape 1
    // 4- save
    return await this.userRepository.save(userCreate);
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<Users> {
    const userFound = await this.userRepository.findOneBy({ id: id });
    if (!userFound) {
      throw new NotFoundException(`Pas d'utilisateurs avec l'id : ${id}`);
    }
    return userFound;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    const userUpdate = await this.findOne(id);
    if (userUpdate.lastname !== undefined) {
      userUpdate.lastname = updateUserDto.lastname;
    }
    if (userUpdate.age !== undefined) {
      userUpdate.age = updateUserDto.age;
    }
    if (userUpdate.email !== undefined) {
      userUpdate.email = updateUserDto.email;
    }
    if (userUpdate.gender !== undefined) {
      userUpdate.gender = updateUserDto.gender;
    }
    if (userUpdate.height !== undefined) {
      userUpdate.height = updateUserDto.height;
    }
    if (userUpdate.firstname !== undefined) {
      userUpdate.firstname = updateUserDto.firstname;
    }
    if (userUpdate.password !== undefined) {
      userUpdate.password = updateUserDto.password;
    }
    if (userUpdate.weight !== undefined) {
      userUpdate.weight = updateUserDto.weight;
    }
    // if (userUpdate.exercices !== undefined) {
    //   userUpdate.exercices = userUpdate.exercices;
    // }
    // if (userUpdate.Activity !== undefined) {
    //   userUpdate.Activity = updateUserDto.Activity;
    // }

    return await this.userRepository.save(userUpdate);
  }

  async remove(id: string): Promise<string> {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas d'utilisateurs avec l'id : ${id}`);
    }
    return `Vous venez de supprimer l'utilisateur possédant l'id: ${id}`;
  }
}
