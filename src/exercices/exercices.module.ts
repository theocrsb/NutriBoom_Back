import { Module } from '@nestjs/common';
import { ExercicesService } from './exercices.service';
import { ExercicesController } from './exercices.controller';
import { Exercices } from './entities/exercice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/activity/entities/activity.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exercices, Activity]), AuthModule],
  controllers: [ExercicesController],
  providers: [ExercicesService],
})
export class ExercicesModule {}
