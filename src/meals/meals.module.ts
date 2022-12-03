import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { Meals } from './entities/meal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Meals])],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
