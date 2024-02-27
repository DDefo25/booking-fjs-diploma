import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategyCookies extends PassportStrategy(
  Strategy,
  'jwt-cookies',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategyCookies.extractJWTFromCookies,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
    });
  }

  async validate({ email }: any) {
    const user = await this.authService.validateUser(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private static extractJWTFromCookies(req: RequestType): string | null {
    const { refreshToken } = req.cookies;
    if (refreshToken && refreshToken.length > 0) return refreshToken;
    return null;
  }
}
