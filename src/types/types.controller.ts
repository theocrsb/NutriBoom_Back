import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('types')
@UseGuards(AuthGuard(), AdminGuard)
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  //ADMIN
  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    if (createTypeDto.name) {
      return this.typesService.create(createTypeDto);
    } else {
      throw new BadRequestException(`Veuillez indiquer le type de repas !`);
    }
  }

  //ADMIN
  @Get()
  findAll() {
    return this.typesService.findAll();
  }

  //ADMIN
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesService.findOne(id);
  }

  //ADMIN
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typesService.update(id, updateTypeDto);
  }

  //ADMIN
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesService.remove(id);
  }
}
