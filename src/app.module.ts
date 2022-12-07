import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// ajout typeORM module
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ActivityModule } from './activity/activity.module';
import { TypesModule } from './types/types.module';
import { FoodsModule } from './foods/foods.module';
import * as dotenv from 'dotenv';
import { Users } from './users/entities/user.entity';
import { Activity } from './activity/entities/activity.entity';
import { Type } from './types/entities/type.entity';
import { Food } from './foods/entities/food.entity';
import { ExercicesModule } from './exercices/exercices.module';
import { Exercices } from './exercices/entities/exercice.entity';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { AuthModule } from './auth/auth.module';
import { EatenFoodModule } from './eatenfood/eatenfood.module';
import { EatenFood } from './eatenfood/entities/eatenfood.entity';

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
      entities: [Users, Exercices, Activity, EatenFood, Type, Food, Role],
      synchronize: process.env.MODE === 'DEV' ? true : false,
    }),
    UsersModule,
    ActivityModule,
    EatenFoodModule,
    TypesModule,
    FoodsModule,
    ExercicesModule,
    RoleModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
