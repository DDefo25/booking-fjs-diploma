import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Socket } from 'socket.io';

@Injectable()
export class JwtStrategyWs extends PassportStrategy(Strategy, 'jwt-socket.io') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategyWs.extractJWTFromWS,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate({ email }: any) {
    const user = await this.authService.validateUser(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private static extractJWTFromWS(req: Socket): string | null {
    const { headers } = req?.handshake;
    if (headers.authorization) {
      if (headers.authorization?.length) return headers.authorization;
    }
    return null;
  }
}
