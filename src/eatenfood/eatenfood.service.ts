import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from 'src/foods/entities/food.entity';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateEatenFoodDto } from './dto/create-eatenfood.dto';
import { UpdateEatenFoodDto } from './dto/update-eatenfood.dto';
import { EatenFood } from './entities/eatenfood.entity';

@Injectable()
export class EatenFoodService {
  constructor(
    @InjectRepository(EatenFood)
    private eatenFoodRepository: Repository<EatenFood>,
  ) {}

  async create(
    createEatenFoodDto: CreateEatenFoodDto,
    user: Users,
  ): Promise<EatenFood> {
    const users = {
      id: user.id,
    };
    const eatenfood = { ...createEatenFoodDto, users };
    console.log('createEatenFoodDto', createEatenFoodDto);
    return await this.eatenFoodRepository.save(eatenfood);
  }

  async findAll(user: Users): Promise<EatenFood[]> {
    console.log('user', user);
    console.log('userlabel', user.role.label);
    // if (user.role.label === 'admin') {
    //   return await this.eatenFoodRepository.find();
    // } else {
    //   throw new UnauthorizedException(`Pas admin`);
    // }
    return await this.eatenFoodRepository.find();
  }

  async findOne(id: string): Promise<EatenFood> {
    const mealFound = await this.eatenFoodRepository.findOneBy({ id: id });
    if (!mealFound) {
      throw new NotFoundException(`Pas d'activités avec l'id: ${id}`);
    }
    return mealFound;
  }

  async update(
    id: string,
    updateEatenFoodDto: UpdateEatenFoodDto,
  ): Promise<EatenFood> {
    const updateMeal = await this.findOne(id);
    if (updateMeal.name !== undefined) {
      updateMeal.name = updateEatenFoodDto.name;
    }

    if (updateMeal.createdAt !== undefined) {
      updateMeal.createdAt = updateEatenFoodDto.date;
    }
    return await this.eatenFoodRepository.save(updateMeal);
  }

  async remove(id: string): Promise<string> {
    const result = await this.eatenFoodRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas d'activités avec l'id: ${id}`);
    }
    return `l'activité à l'id: ${id} a été supprimée!`;
  }
}
