// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super();
//   }

//   async validate(email: string, password: string): Promise<any> {
//     console.log('coucou');
//     const user = await this.authService.validateUser(email, password);
//     console.log('user: ', user);
//     if (!user) {
//       console.log('erreur');
//       throw new UnauthorizedException(`not validate user`);
//     }
//     return user;
//   }
// }
