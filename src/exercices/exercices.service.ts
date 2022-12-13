import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateExerciceDto } from './dto/create-exercice.dto';
import { UpdateExerciceDto } from './dto/update-exercice.dto';
import { Exercices } from './entities/exercice.entity';

@Injectable()
export class ExercicesService {
  constructor(
    @InjectRepository(Exercices)
    private activityRepository: Repository<Exercices>,
  ) {}
  async create(
    createExerciceDto: CreateExerciceDto,
    user: Users,
  ): Promise<Exercices> {
    const users = {
      id: user.id,
    };
    const exercices = {
      ...createExerciceDto,
      users,
    };
    console.log('exo', exercices);
    return await this.activityRepository.save(exercices);
  }
  // findall dans le User by ID
  async findAll(): Promise<Exercices[]> {
    return await this.activityRepository.find();
  }

  async findOne(id: number): Promise<Exercices> {
    const exerciseFound = await this.activityRepository.findOneBy({ id: id });
    if (!exerciseFound) {
      throw new NotFoundException(`Pas d'activités avec l'id: ${id}`);
    }
    return exerciseFound;
  }

  async update(
    id: number,
    updateExerciceDto: UpdateExerciceDto,
  ): Promise<Exercices> {
    const updateExercices = await this.findOne(id);
    return await this.activityRepository.save(updateExercices);
  }

  async remove(id: number, user: Users): Promise<string> {
    const queryRemove = await this.activityRepository.createQueryBuilder();
    queryRemove.where({ id: id }).andWhere({ users: user });
    const found = await queryRemove.getOne();
    //
    if (!found) {
      throw new NotFoundException(`Pas d'activtés avec l'id: ${id}`);
    } else {
      await this.activityRepository.delete({ id });
      return 'ok cool';
    }
  }
}
