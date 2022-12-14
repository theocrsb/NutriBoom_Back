import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@UseGuards(JwtAuthGuard)
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}
  //ADMIN
  @Post()
  create(@Body() createActivityDto: CreateActivityDto) {
    if (createActivityDto.name && createActivityDto.conso_cal_1h) {
      return this.activityService.create(createActivityDto);
    } else {
      throw new BadRequestException(
        `Veuillez remplir les champs correctement !`,
      );
    }
  }
  //USER sans getUser
  @Get()
  async findAll() {
    return await this.activityService.findAll();
  }
  //USER sans getUser
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.activityService.findOne(id);
  }
  //ADMIN
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return await this.activityService.update(id, updateActivityDto);
  }
  //ADMIN
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.activityService.remove(id);
  }
}
