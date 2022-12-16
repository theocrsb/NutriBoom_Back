import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  BadRequestException,
} from '@nestjs/common';
// import { AuthGuard } from './auth/jwt-auth.guard';
// import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Users } from 'src/users/entities/user.entity';
import { UserLoginDto } from './dto/userLoginDto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() user: UserLoginDto) {
    if (user.email && user.password) {
      return this.authService.login(user);
    } else {
      throw new BadRequestException(
        `Les champs email et/ou password n'ont pas été renseignés correctement!`,
      );
    }
  }
}
