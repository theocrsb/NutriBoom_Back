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
    // if (user.role.label === 'admin') {
    const query = this.eatenFoodRepository.createQueryBuilder();
    query.where({ users: user });
    return query.getMany();
    // return await this.eatenFoodRepository.find();
    //} else {
    //throw new UnauthorizedException(`Pas admin`);
    //}
  }

  async findOne(id: string, user: Users): Promise<EatenFood> {
    // console.log(querytest);
    // console.log('query : ', querytest.getParameters().orm_param_1);
    // console.log('user : ', user.id);
    // console.log('id : ', id);
    // console.log('user.eatenfood[0].id : ', user.eatenfood[0].id);
    // console.log('valueId', valueId);
    // console.log('include ------', valueId.id.includes(id));
    const querytest = await this.eatenFoodRepository.createQueryBuilder();
    querytest.where({ id: id }).andWhere({ users: user });
    //.limit(1);
    // const valueId = {
    //   id: user.eatenfood.map((x) => x.id),
    // };
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
    // return query.getOne();
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
    const query = this.eatenFoodRepository.createQueryBuilder();
    query.where({ id: id }).andWhere({ users: user });
    if (!query) {
      throw new NotFoundException(`Pas d'aliment consommé  avec l'id: ${id}`);
    }
    const result = await this.eatenFoodRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas d'aliment consommé avec l'id: ${id}`);
    }
    return `l'aliment à l'id: ${id} a été supprimée!`;
  }
}
