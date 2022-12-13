import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  async findAll(user: Users): Promise<Exercices[]> {
    const query = this.activityRepository.createQueryBuilder();
    query.where({ users: user });
    return query.getMany();
  }

  async findOne(id: number, user: Users): Promise<Exercices> {
    const queryExo = await this.activityRepository.createQueryBuilder();
    queryExo.where({ id: id }).andWhere({ users: user });
    const found = await queryExo.getOne();

    if (!found) {
      throw new NotFoundException(`Pas d'aliment consommé avec l'id: ${id}`);
    } else {
      return found;
    }
  }

  async update(
    id: number,
    updateExerciceDto: UpdateExerciceDto,
    user: Users,
  ): Promise<Exercices> {
    const query = this.activityRepository.createQueryBuilder();
    query.where({ id: id }).andWhere({ users: user });
    const patch = await query.getOne();
    console.log(!patch);
    if (!query) {
      throw new NotFoundException(
        `Pas d'aliment consommé modifiable avec l'id: ${id}`,
      );
    }
    // return query.getOne();
    const updateMeal = await this.findOne(id, user);
    if (updateMeal.time !== undefined || null) {
      updateMeal.time = updateExerciceDto.time;
    }
    if (updateMeal.activity !== undefined || null) {
      updateMeal.activity = updateExerciceDto.activity;
    } else {
      throw new BadRequestException(
        `Veuillez renseigner le(s) champs nom et/ou quantité correctement!`,
      );
    }

    return await this.activityRepository.save(updateMeal);
  }

  async remove(id: number): Promise<string> {
    return `This action removes a #${id} exercice`;
  }
}
