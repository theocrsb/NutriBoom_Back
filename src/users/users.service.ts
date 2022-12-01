import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // Ajout constructor pour interagir avec la table User
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
    //'This action adds a new user';
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
    //`This action returns all users`;
  }

  async findOne(id: string): Promise<User> {
    const userFound = await this.userRepository.findOneBy({ id: id });
    if (!userFound) {
      throw new NotFoundException(`Pas d'utilisateurs avec l'id : ${id}`);
    }
    return userFound;
    //`This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userUpdate = await this.findOne(id);
    if (
      userUpdate.lastname !== undefined ||
      userUpdate.age !== undefined ||
      userUpdate.email !== undefined ||
      userUpdate.gender !== undefined ||
      userUpdate.height !== undefined ||
      userUpdate.firstname !== undefined ||
      userUpdate.password !== undefined ||
      userUpdate.weight
    ) {
      userUpdate.lastname === updateUserDto.lastname ||
        userUpdate.age === updateUserDto.age ||
        userUpdate.email === updateUserDto.email ||
        userUpdate.height === updateUserDto.height ||
        userUpdate.firstname === updateUserDto.firstname ||
        userUpdate.password === updateUserDto.password ||
        userUpdate.weight === updateUserDto.weight;
    }
    return await this.userRepository.save(userUpdate);
    //test branch dev
  }

  async remove(id: string): Promise<string> {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas d'utilisateurs avec l'id : ${id}`);
    }
    return `Vous venez de supprimer l'utilisateur possédant l'id: ${id}`;
  }
}
