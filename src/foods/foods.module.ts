import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { Type } from 'src/types/entities/type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Food]), AuthModule],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}
