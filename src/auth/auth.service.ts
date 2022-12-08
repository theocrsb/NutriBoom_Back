import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/entities/user.entity';
import { UserLoginDto } from './dto/userLoginDto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    console.log('validate user');
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userLogin: UserLoginDto) {
    const userFound = await this.userRepo.findOneBy({ email: userLogin.email });
    if (
      userFound &&
      (await bcrypt.compare(userLogin.password, userFound.password))
    ) {
      const payload = {
        username: userLogin.email,
        role: userFound.role.label,
        id: userFound.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException(
        'Please check your credentials and try again.',
      );
    }
  }
}
