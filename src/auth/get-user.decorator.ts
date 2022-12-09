import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from 'src/users/entities/user.entity';

export const GetUser = createParamDecorator(
  //_ devant data pour signaler qu'il n'est pas utilisé
  (_data, ctx: ExecutionContext): Users => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
