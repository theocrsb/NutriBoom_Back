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
import { ExercicesService } from './exercices.service';
import { CreateExerciceDto } from './dto/create-exercice.dto';
import { UpdateExerciceDto } from './dto/update-exercice.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { Users } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('exercices')
@UseGuards(JwtAuthGuard)
export class ExercicesController {
  constructor(private readonly exercicesService: ExercicesService) {}

  //USER avec getUser
  @Post()
  create(@Body() createExerciceDto: CreateExerciceDto, @GetUser() user: Users) {
    if (createExerciceDto.activity && createExerciceDto.time) {
      return this.exercicesService.create(createExerciceDto, user);
    } else {
      throw new BadRequestException(
        `Veuillez remplir tous les champs correctement !`,
      );
    }
  }

  //USER avec getUser
  @Get()
  findAll(@GetUser() user: Users) {
    return this.exercicesService.findAll(user);
  }

  //USER avec getUser
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: Users) {
    return this.exercicesService.findOne(+id, user);
  }

  //USER avec getUser
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciceDto: UpdateExerciceDto,
    @GetUser() user: Users,
  ) {
    return this.exercicesService.update(+id, updateExerciceDto, user);
  }

  //USER avec getUser
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercicesService.remove(+id);
  }
}
