import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/activity/entities/activity.entity';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateExerciceDto } from './dto/create-exercice.dto';
import { UpdateExerciceDto } from './dto/update-exercice.dto';
import { Exercices } from './entities/exercice.entity';

@Injectable()
export class ExercicesService {
  constructor(
    @InjectRepository(Exercices)
    private exoRepository: Repository<Exercices>,
    @InjectRepository(Activity)
    private actiRepository: Repository<Activity>,
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
    return await this.exoRepository.save(exercices);
  }
  // findall dans le User by ID
  async findAll(user: Users): Promise<Exercices[]> {
    //return this.exoRepository.find();
    const query = this.exoRepository.createQueryBuilder();
    query.where({ users: user });
    return query.getMany();
  }

  async findOne(id: number, user: Users): Promise<Exercices> {
    const queryExo = await this.exoRepository.createQueryBuilder();
    queryExo.where({ id: id }).andWhere({ users: user });
    const found = await queryExo.getOne();

    if (!found) {
      throw new NotFoundException(`Pas d'exercices avec l'id: ${id}`);
    } else {
      return found;
    }
  }

  async update(
    id: number,
    updateExerciceDto: UpdateExerciceDto,
    user: Users,
  ): Promise<Exercices> {
    const query = this.exoRepository.createQueryBuilder();
    query.where({ id: id }).andWhere({ users: user });
    const patch = await query.getOne();
    console.log(!patch);
    if (!query) {
      throw new NotFoundException(
        `Pas d'exercices modifiable avec l'id: ${id}`,
      );
    }

    const updateExo = await this.findOne(id, user);
    const activity = await this.actiRepository.findOneBy({
      id: updateExerciceDto.activity.id,
    });
    if (activity) {
      updateExo.activity = activity;
      this.exoRepository.save(updateExo);
    }
    console.log('updateExo----------', updateExo);
    console.log('updateExotime', updateExo.time);
    // activity non recuperer car eager true du coté user.
    // Pour changer l'activité delete
    //possiblité d'update uniquement le time
    console.log('updateExoacti', updateExo.activity);
    if (updateExo.time !== undefined || null) {
      updateExo.time = updateExerciceDto.time;
    }
    if (updateExo.activity) {
      updateExo.activity = updateExerciceDto.activity;
    } else {
      throw new BadRequestException(
        `Veuillez renseigner le(s) champs nom et/ou quantité correctement!`,
      );
    }

    return await this.exoRepository.save(updateExo);
  }

  async remove(id: number, user: Users): Promise<string> {
    const queryRemove = await this.exoRepository.createQueryBuilder();
    queryRemove.where({ id: id }).andWhere({ users: user });
    const found = await queryRemove.getOne();
    //
    if (!found) {
      throw new NotFoundException(`Pas d'exercices avec l'id: ${id}`);
    } else {
      await this.exoRepository.delete({ id });
      return 'exercices supprimé !!!';
    }
  }
}
