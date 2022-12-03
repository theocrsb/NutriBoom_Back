import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    return await this.activityRepository.save(createActivityDto);
  }

  async findAll(): Promise<Activity[]> {
    return await this.activityRepository.find();
  }

  async findOne(id: string): Promise<Activity> {
    const activityFound = await this.activityRepository.findOneBy({ id: id });
    if (!activityFound) {
      throw new NotFoundException(`Pas d'activités avec l'id: ${id}`);
    }
    return activityFound;
  }

  async update(
    id: string,
    updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    const updateActivity = await this.findOne(id);
    if (updateActivity.name !== undefined) {
      updateActivity.name = updateActivityDto.name;
    }

    if (updateActivity.conso_cal !== undefined) {
      updateActivity.conso_cal = updateActivityDto.conso_cal;
    }
    return await this.activityRepository.save(updateActivity);
  }

  async remove(id: string): Promise<string> {
    const result = await this.activityRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas d'activités avec l'id: ${id}`);
    }
    return `l'activité à l'id: ${id} a été supprimée!`;
  }
}
