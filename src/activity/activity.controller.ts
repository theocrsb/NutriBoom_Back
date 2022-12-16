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
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard';

import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activity')
@UseGuards(AuthGuard())
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}
  //ADMIN
  @Post()
  @UseGuards(AdminGuard)
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
  @UseGuards(AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return await this.activityService.update(id, updateActivityDto);
  }
  //ADMIN
  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string) {
    return await this.activityService.remove(id);
  }
}
