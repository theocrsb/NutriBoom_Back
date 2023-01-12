import { JwtModule, JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  // Ajout import TypeOrmModule.forFeature([])
  // importer le AuthModule pour pour utiliser le Guard
  imports: [
    TypeOrmModule.forFeature([Users, Role]),
    AuthModule,
    HttpModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY_RESET,
      signOptions: { expiresIn: '20m' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
