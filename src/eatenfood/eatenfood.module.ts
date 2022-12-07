import { Module } from '@nestjs/common';

import { EatenFoodController } from './eatenfood.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EatenFood } from './entities/eatenfood.entity';
import { EatenFoodService } from './eatenfood.service';

@Module({
  imports: [TypeOrmModule.forFeature([EatenFood])],
  controllers: [EatenFoodController],
  providers: [EatenFoodService],
})
export class EatenFoodModule {}
