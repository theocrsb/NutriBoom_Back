import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateEatenFoodDto } from './dto/create-eatenfood.dto';
import { UpdateEatenFoodDto } from './dto/update-eatenfood.dto';
import { EatenFoodService } from './eatenfood.service';

@Controller('meals')
export class EatenFoodController {
  constructor(private readonly mealsService: EatenFoodService) {}

  @Post()
  create(@Body() createMealDto: CreateEatenFoodDto) {
    return this.mealsService.create(createMealDto);
  }

  @Get()
  findAll() {
    return this.mealsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealDto: UpdateEatenFoodDto) {
    return this.mealsService.update(id, updateMealDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealsService.remove(id);
  }
}
