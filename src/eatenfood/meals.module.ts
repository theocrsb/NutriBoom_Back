import { Module } from '@nestjs/common';

import { EatenFoodController } from './meals.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EatenFood } from './entities/meal.entity';
import { EatenFoodService } from './meals.service';

@Module({
  imports: [TypeOrmModule.forFeature([EatenFood])],
  controllers: [EatenFoodController],
  providers: [EatenFoodService],
})
export class EatenFoodModule {}
