import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  // Ajout constructor pour interagir avec la table Users
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<Users> {
    return await this.userRepository.save(createUserDto);
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
