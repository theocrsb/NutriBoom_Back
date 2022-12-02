import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercices, Users } from './entities/user.entity';

@Module({
  // Ajout import TypeOrmModule.forFeature([])
  imports: [
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Exercices]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
