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
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Users } from 'src/users/entities/user.entity';
import { CreateEatenFoodDto } from './dto/create-eatenfood.dto';
import { UpdateEatenFoodDto } from './dto/update-eatenfood.dto';
import { EatenFoodService } from './eatenfood.service';
@Controller('meals')
// @UseGuards(JwtAuthGuard)
// sur tout les routes
export class EatenFoodController {
  constructor(private readonly mealsService: EatenFoodService) {}

  //pensez a etre connecté pour recuperer l'utilisateur !!!
  @UseGuards(JwtAuthGuard)
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

  @Get()
  findAll(@GetUser() user: Users) {
    console.log('user get all', user);
    return this.mealsService.findAll(user);
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
  remove(@Param('id') id: string, @GetUser() user: Users) {
    return this.mealsService.remove(id, user);
  }
}
