import { Module } from '@nestjs/common';
import { ExercicesService } from './exercices.service';
import { ExercicesController } from './exercices.controller';
import { Exercices } from './entities/exercice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Exercices])],
  controllers: [ExercicesController],
  providers: [ExercicesService],
})
export class ExercicesModule {}
