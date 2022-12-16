import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    // on recupere le user grace a la requete modifité par passport (valide)
    console.log('req -----------', req.user.role);
    if (req.user.role.id === 2) {
      return true;
    } else {
      return false;
    }
  }
}
