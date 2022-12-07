import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from 'src/foods/entities/food.entity';
import { Repository } from 'typeorm';
import { CreateEatenFoodDto } from './dto/create-meal.dto';
import { UpdateEatenFoodDto } from './dto/update-meal.dto';
import { EatenFood } from './entities/meal.entity';

@Injectable()
export class EatenFoodService {
  constructor(
    @InjectRepository(EatenFood)
    private EatenFoodRepository: Repository<EatenFood>,
  ) {}

  async create(createMealDto: CreateEatenFoodDto): Promise<EatenFood> {
    return await this.EatenFoodRepository.save(createMealDto);
  }

  async findAll(): Promise<EatenFood[]> {
    return await this.EatenFoodRepository.find();
  }

  async findOne(id: string): Promise<EatenFood> {
    const mealFound = await this.EatenFoodRepository.findOneBy({ id: id });
    if (!mealFound) {
      throw new NotFoundException(`Pas d'activités avec l'id: ${id}`);
    }
    return mealFound;
  }

  async update(
    id: string,
    updateMealDto: UpdateEatenFoodDto,
  ): Promise<EatenFood> {
    const updateMeal = await this.findOne(id);
    if (updateMeal.name !== undefined) {
      updateMeal.name = updateMealDto.name;
    }

    if (updateMeal.createdAt !== undefined) {
      updateMeal.createdAt = updateMealDto.date;
    }
    return await this.EatenFoodRepository.save(updateMeal);
  }

  async remove(id: string): Promise<string> {
    const result = await this.EatenFoodRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas d'activités avec l'id: ${id}`);
    }
    return `l'activité à l'id: ${id} a été supprimée!`;
  }
}
