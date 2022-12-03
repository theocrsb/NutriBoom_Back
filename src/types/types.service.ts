import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
  ) {}
  async create(createTypeDto: CreateTypeDto): Promise<Type> {
    return await this.typeRepository.save(createTypeDto);
  }

  async findAll(): Promise<Type[]> {
    return await this.typeRepository.find();
  }

  async findOne(id: string) {
    const mealFound = await this.typeRepository.findOneBy({ id: id });
    if (!mealFound) {
      throw new NotFoundException(`Pas de types de repas avec l'id: ${id}`);
    }
    return mealFound;
  }

  async update(id: string, updateTypeDto: UpdateTypeDto): Promise<Type> {
    const updateType = await this.findOne(id);
    if (updateType.name !== undefined) {
      updateType.name = updateTypeDto.name;
    }

    return await this.typeRepository.save(updateType);
  }

  async remove(id: string) {
    const result = await this.typeRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas de types de repas avec l'id: ${id}`);
    }
    return `le type de repas à l'id: ${id} a été supprimé!`;
  }
}
