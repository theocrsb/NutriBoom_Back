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
import { ExercicesService } from './exercices.service';
import { CreateExerciceDto } from './dto/create-exercice.dto';
import { UpdateExerciceDto } from './dto/update-exercice.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { Users } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('exercices')
export class ExercicesController {
  constructor(private readonly exercicesService: ExercicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createExerciceDto: CreateExerciceDto, @GetUser() user: Users) {
    return this.exercicesService.create(createExerciceDto, user);
  }
  @Get()
  findAll() {
    return this.exercicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercicesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciceDto: UpdateExerciceDto,
  ) {
    return this.exercicesService.update(+id, updateExerciceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercicesService.remove(+id);
  }
}
