import { Module } from '@nestjs/common';
import { ExercicesService } from './exercices.service';
import { ExercicesController } from './exercices.controller';
import { Exercices } from './entities/exercice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/activity/entities/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercices, Activity])],
  controllers: [ExercicesController],
  providers: [ExercicesService],
})
export class ExercicesModule {}
