import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  BadRequestException,
} from '@nestjs/common';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Users } from 'src/users/entities/user.entity';
import { UserLoginDto } from './dto/userLoginDto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  //   @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: UserLoginDto) {
    if (user.email && user.password) {
      return this.authService.login(user);
    } else {
      throw new BadRequestException(
        `Les champs email et/ou password n'ont pas été renseignés correctement!`,
      );
    }

    //return await this.authService.generateToken(req.user)
  }

  // @UseGuards(LocalAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
