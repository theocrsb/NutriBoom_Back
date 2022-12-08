import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Users } from 'src/users/entities/user.entity';
import { UserLoginDto } from './dto/userLoginDto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  //useguards a confiurer apres
  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: UserLoginDto) {
    return this.authService.login(user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
