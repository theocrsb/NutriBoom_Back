import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from 'src/foods/entities/food.entity';
import { Repository } from 'typeorm';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meals } from './entities/meal.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meals)
    private mealsRepository: Repository<Meals>,
  ) {}

  async create(createMealDto: CreateMealDto): Promise<Meals> {
    return await this.mealsRepository.save(createMealDto);
  }

  async findAll(): Promise<Meals[]> {
    return await this.mealsRepository.find();
  }

  async findOne(id: string): Promise<Meals> {
    const mealFound = await this.mealsRepository.findOneBy({ id: id });
    if (!mealFound) {
      throw new NotFoundException(`Pas d'activités avec l'id: ${id}`);
    }
    return mealFound;
  }

  async update(id: string, updateMealDto: UpdateMealDto): Promise<Meals> {
    const updateMeal = await this.findOne(id);
    if (updateMeal.name !== undefined) {
      updateMeal.name = updateMealDto.name;
    }

    if (updateMeal.createdAt !== undefined) {
      updateMeal.createdAt = updateMealDto.date;
    }
    return await this.mealsRepository.save(updateMeal);
  }

  async remove(id: string): Promise<string> {
    const result = await this.mealsRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas d'activités avec l'id: ${id}`);
    }
    return `l'activité à l'id: ${id} a été supprimée!`;
  }
}
