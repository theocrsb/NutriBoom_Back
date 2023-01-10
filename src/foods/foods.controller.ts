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
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('foods')
@UseGuards(AuthGuard())
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  //ADMIN
  @Post()
  @UseGuards()
  create(@Body() createFoodDto: CreateFoodDto) {
    if (
      createFoodDto.name !== undefined &&
      createFoodDto.nombre_calories !== undefined &&
      createFoodDto.lipides !== undefined &&
      createFoodDto.glucides !== undefined &&
      createFoodDto.proteines !== undefined &&
      createFoodDto.validate !== undefined
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
  // FindAll mais pour l'administrateur : sécurise l'accès à la page Admin
  @Get('/admin')
  @UseGuards(AdminGuard)
  findAllForAdmin() {
    return this.foodsService.findAll();
  }

  //USER sans getUser
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(id);
  }

  //ADMIN
  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(id, updateFoodDto);
  }

  //ADMIN
  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.foodsService.remove(id);
  }
}
