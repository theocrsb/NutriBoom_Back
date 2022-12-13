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
  // findall dans le User by ID
  async findAll(user: Users): Promise<EatenFood[]> {
    console.log('user', user);
    console.log('userlabel', user.role.label);
    // if (user.role.label === 'admin') {
    //   return await this.eatenFoodRepository.find();
    // } else {
    //   throw new UnauthorizedException(`Pas admin`);
    // }
    const query = this.eatenFoodRepository.createQueryBuilder();
    query.where({ users: user });
    return query.getMany();
  }

  async findOne(id: string, user: Users): Promise<EatenFood> {
    // const mealFound = await this.eatenFoodRepository.findOneBy({
    //   id: id,
    //   users: user,
    // });
    const query = this.eatenFoodRepository.createQueryBuilder();
    query.where({ id: id }).andWhere({ users: user });
    if (!query) {
      throw new NotFoundException(`Pas d'aliment consommé avec l'id: ${id}`);
    }
    return query.getOne();
    //mealFound;
  }

  async update(
    id: string,
    updateEatenFoodDto: UpdateEatenFoodDto,
    user: Users,
  ): Promise<EatenFood> {
    const updateMeal = await this.findOne(id, user);
    if (updateMeal.name !== undefined) {
      updateMeal.name = updateEatenFoodDto.name;
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
