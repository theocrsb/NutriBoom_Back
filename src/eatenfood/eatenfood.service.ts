import {
  BadRequestException,
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
    const query = this.eatenFoodRepository.createQueryBuilder();
    query.where({ users: user });
    return query.getMany();
  }

  async findOne(id: string, user: Users): Promise<EatenFood> {
    const querytest = await this.eatenFoodRepository.createQueryBuilder();
    querytest.where({ id: id }).andWhere({ users: user });
    const found = await querytest.getOne();
    console.log(found);
    if (!found) {
      throw new NotFoundException(`Pas d'aliment consommé avec l'id: ${id}`);
    } else {
      return found;
    }
  }

  async update(
    id: string,
    updateEatenFoodDto: UpdateEatenFoodDto,
    user: Users,
  ): Promise<EatenFood> {
    const query = this.eatenFoodRepository.createQueryBuilder();
    query.where({ id: id }).andWhere({ users: user });
    const patch = await query.getOne();
    console.log(!patch);
    if (!query) {
      throw new NotFoundException(
        `Pas d'aliment consommé modifiable avec l'id: ${id}`,
      );
    }
    const updateMeal = await this.findOne(id, user);
    if (updateMeal.name !== undefined || null) {
      updateMeal.name = updateEatenFoodDto.name;
    }
    if (updateMeal.quantity !== undefined || null) {
      updateMeal.quantity = updateEatenFoodDto.quantity;
    } else {
      throw new BadRequestException(
        `Veuillez renseigner le(s) champs nom et/ou quantité correctement!`,
      );
    }

    return await this.eatenFoodRepository.save(updateMeal);
  }

  async remove(id: string, user: Users): Promise<string> {
    const querytest = await this.eatenFoodRepository.createQueryBuilder();
    querytest.where({ id: id }).andWhere({ users: user });
    const found = await querytest.getOne();
    if (!found) {
      throw new NotFoundException(`Pas d'aliment consommé avec l'id: ${id}`);
    } else {
      await this.eatenFoodRepository.delete({ id });
      return 'ok cool';
    }
  }
}
