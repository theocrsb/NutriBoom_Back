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
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('foods')
@UseGuards(JwtAuthGuard)
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  //ADMIN
  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    if (
      createFoodDto.name &&
      createFoodDto.nombre_calories &&
      createFoodDto.lipides &&
      createFoodDto.glucides &&
      createFoodDto.proteines
    ) {
      return this.foodsService.create(createFoodDto);
    } else {
      throw new BadRequestException(
        `Veuillez remplir tous les champs correctement !`,
      );
    }
  }

  //USER sans getUser
  @Get()
  findAll() {
    return this.foodsService.findAll();
  }

  //USER sans getUser
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(id);
  }

  //ADMIN
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(id, updateFoodDto);
  }

  //ADMIN
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodsService.remove(id);
  }
}
