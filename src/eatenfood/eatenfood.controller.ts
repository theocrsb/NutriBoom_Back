import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Users } from 'src/users/entities/user.entity';
import { CreateEatenFoodDto } from './dto/create-eatenfood.dto';
import { UpdateEatenFoodDto } from './dto/update-eatenfood.dto';
import { EatenFoodService } from './eatenfood.service';

@Controller('meals')
export class EatenFoodController {
  constructor(private readonly mealsService: EatenFoodService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createEatenFoodDto: CreateEatenFoodDto,
    @GetUser() user: Users,
  ) {
    console.log(user);
    return this.mealsService.create(createEatenFoodDto, user);
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
  update(
    @Param('id') id: string,
    @Body() updateEatenFoodDto: UpdateEatenFoodDto,
  ) {
    return this.mealsService.update(id, updateEatenFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealsService.remove(id);
  }
}
