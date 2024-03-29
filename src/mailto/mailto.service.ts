import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMailtoDto } from './dto/create-mailto.dto';
import { MailTo } from './entities/mailto.entity';
// import { UpdateMailtoDto } from './dto/update-mailto.dto';

@Injectable()
export class MailtoService {
  constructor(
    @InjectRepository(MailTo)
    private mailToRepository: Repository<MailTo>,
  ) {}
  async create(createMailtoDto: CreateMailtoDto): Promise<MailTo> {
    return await this.mailToRepository.save(createMailtoDto);
  }

  async findAll(): Promise<MailTo[]> {
    return await this.mailToRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} mailto`;
  }

  // update(id: number, updateMailtoDto: UpdateMailtoDto) {
  //   return `This action updates a #${id} mailto`;
  // }

  async remove(id: number) {
    const result = await this.mailToRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas de mail avec l'id: ${id}`);
    }
    return `le mail avec l'id: ${id} a été supprimé!`;
  }
}
