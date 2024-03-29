import { Module } from '@nestjs/common';

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
import { EatenFoodModule } from './eatenfood/eatenfood.module';
import { EatenFood } from './eatenfood/entities/eatenfood.entity';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth/auth.controller';
import { MailtoModule } from './mailto/mailto.module';
import { MailTo } from './mailto/entities/mailto.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

dotenv.config({ path: '.env' });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Users,
        Exercices,
        Activity,
        EatenFood,
        Type,
        Food,
        Role,
        MailTo,
      ],
      synchronize: process.env.MODE === 'DEV' ? true : false,
      logging: false,
    }),
    UsersModule,
    ActivityModule,
    EatenFoodModule,
    TypesModule,
    FoodsModule,
    ExercicesModule,
    RoleModule,
    AuthModule,
    PassportModule,
    MailtoModule,
  ],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}
