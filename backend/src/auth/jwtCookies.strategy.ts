import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "./auth.service";
import { Request as RequestType } from "express";
import { Socket } from "socket.io";
import { parse } from 'cookie'

@Injectable()
export class JwtStrategyCookies extends PassportStrategy(Strategy, 'jwt-cookies') {
  constructor(
    private authService: AuthService
  ) {
    super({
      jwtFromRequest:  ExtractJwt.fromExtractors([
        JwtStrategyCookies.extractJWTFromCookies,
        // JwtStrategyCookies.extractJWTFromWS,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
    });
  }

  async validate({ email }: any) {
    const user = await this.authService.validateUser( email )
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  // private static extractJWTFromWS(req: Socket): string | null {
  //   const { cookie } = req?.handshake?.headers
  //   if ( cookie ) {
  //     const { refreshToken } = parse(cookie)
  //       if ( refreshToken ) return refreshToken
  //   }
  //   return null;
  // }

  private static extractJWTFromCookies(req: RequestType): string | null {
    const { refreshToken } = req.cookies
    if ( refreshToken && refreshToken.length > 0 ) return refreshToken
    return null;
  }

}