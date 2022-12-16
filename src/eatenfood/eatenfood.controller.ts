import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Users } from 'src/users/entities/user.entity';
import { CreateEatenFoodDto } from './dto/create-eatenfood.dto';
import { UpdateEatenFoodDto } from './dto/update-eatenfood.dto';
import { EatenFoodService } from './eatenfood.service';
@Controller('meals')
@UseGuards(AuthGuard())
export class EatenFoodController {
  constructor(private readonly mealsService: EatenFoodService) {}

  //USER avec getUser
  @Post()
  create(
    @Body() createEatenFoodDto: CreateEatenFoodDto,
    @GetUser() user: Users,
  ) {
    if (createEatenFoodDto.name && createEatenFoodDto.quantity) {
      return this.mealsService.create(createEatenFoodDto, user);
    } else {
      throw new BadRequestException(
        `Veuillez remplir tous les champs correctement !`,
      );
    }
  }

  //USER avec getUser
  @Get()
  findAll(@GetUser() user: Users) {
    console.log('user get all', user);
    return this.mealsService.findAll(user);
  }
  //USER avec getUser
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: Users) {
    return this.mealsService.findOne(id, user);
  }

  //USER avec getUser
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEatenFoodDto: UpdateEatenFoodDto,
    @GetUser() user: Users,
  ) {
    if (
      updateEatenFoodDto.name === undefined ||
      updateEatenFoodDto.name === null ||
      updateEatenFoodDto.quantity === undefined ||
      updateEatenFoodDto.name === null
    ) {
      throw new BadRequestException(
        'veuillez remplir un champ pour mettre à jour votre aliment consommé.',
      );
    }
    return this.mealsService.update(id, updateEatenFoodDto, user);
  }

  //USER avec getUser
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: Users) {
    return this.mealsService.remove(id, user);
  }
}
