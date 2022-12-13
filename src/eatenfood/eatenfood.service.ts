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
    if (!query) {
      throw new NotFoundException(
        `Pas d'aliment consommé modifiable avec l'id: ${id}`,
      );
    }
    // return query.getOne();
    const updateMeal = await this.findOne(id, user);
    if (updateMeal.name !== undefined) {
      updateMeal.name = updateEatenFoodDto.name;
    }

    return await this.eatenFoodRepository.save(updateMeal);
  }

  async remove(id: string, user: Users): Promise<string> {
    const querytest = await this.eatenFoodRepository.createQueryBuilder();
    querytest.where({ id: id }).andWhere({ users: user });
    const found = await querytest.getOne();
    //
    if (!found) {
      throw new NotFoundException(`Pas d'aliment consommé avec l'id: ${id}`);
    } else {
      await this.eatenFoodRepository.delete({ id });
      return 'ok cool';
    }
  }
}
