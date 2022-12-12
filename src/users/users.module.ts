import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { APP_GUARD } from '@nestjs/core';

@Module({
  // Ajout import TypeOrmModule.forFeature([])
  imports: [TypeOrmModule.forFeature([Users, Role])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
