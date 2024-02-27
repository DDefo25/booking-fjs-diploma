import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtCookiesAuthGuard extends AuthGuard('jwt-cookies') {
  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  public handleRequest(err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }
}
