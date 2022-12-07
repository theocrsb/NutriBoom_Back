import { Injectable } from '@nestjs/common';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  // constructor(private usersService: UsersService) {} @InjectRepository(Users)
  private userRepository: Repository<Users>;

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ email: email });
    console.log('dans le validateUser : USer ', user);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
