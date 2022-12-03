import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food } from './entities/food.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
  ) {}
  async create(createFoodDto: CreateFoodDto) {
    return await this.foodRepository.save(createFoodDto);
  }

  async findAll() {
    return await this.foodRepository.find();
  }

  async findOne(id: string) {
    const foodFound = await this.foodRepository.findOneBy({ id: id });
    if (!foodFound) {
      throw new NotFoundException(`Pas d'aliments avec l'id: ${id}`);
    }
    return foodFound;
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    const updateFood = await this.findOne(id);
    if (updateFood.name !== undefined) {
      updateFood.name = updateFoodDto.name;
    }
    if (updateFood.nombre_calories !== undefined) {
      updateFood.nombre_calories = updateFoodDto.nombre_calories;
    }
    if (updateFood.lipides !== undefined) {
      updateFood.lipides = updateFoodDto.lipides;
    }
    if (updateFood.glucides !== undefined) {
      updateFood.glucides = updateFoodDto.glucides;
    }
    if (updateFood.proteines !== undefined) {
      updateFood.proteines = updateFoodDto.proteines;
    }

    return await this.foodRepository.save(updateFood);
  }

  async remove(id: string) {
    const result = await this.foodRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas d'aliments avec l'id: ${id}`);
    }
    return `l'aliment à l'id: ${id} a été supprimé!`;
  }
}
