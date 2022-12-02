import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// ajout typeORM module
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ActivityModule } from './activity/activity.module';
import { MealsModule } from './meals/meals.module';
import { TypesModule } from './types/types.module';
import { FoodsModule } from './foods/foods.module';
import * as dotenv from 'dotenv';
import { Exercices, Users } from './users/entities/user.entity';
import { Activity } from './activity/entities/activity.entity';

dotenv.config({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Users, Activity, Exercices],
      synchronize: process.env.MODE === 'DEV' ? true : false,
    }),
    UsersModule,
    ActivityModule,
    MealsModule,
    TypesModule,
    FoodsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
