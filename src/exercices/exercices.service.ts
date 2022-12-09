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
    const exo = {
      ...createExerciceDto,
      user,
    };
    return await this.activityRepository.save(exo);
  }

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

  async remove(id: number): Promise<string> {
    return `This action removes a #${id} exercice`;
  }
}
