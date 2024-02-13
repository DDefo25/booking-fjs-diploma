import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "./auth.service";
import { Request as RequestType } from "express";
import { Socket } from "socket.io";
import { parse } from 'cookie'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
  ) {
    super({
      jwtFromRequest:  ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // JwtStrategy.extractJWTFromWS,
        // JwtStrategy.extractJWTFromCookies,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
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
  //   console.log(req)
  //   const { headers } = req?.handshake
  //   if ( headers.authorization ) {
  //       if ( headers.authorization?.length) return headers.authorization
  //   }
  //   return null;
  // }

  // private static extractJWTFromCookies(req: RequestType): string | null {
  //   const cookie = req?.cookies
  //   if ( cookie ) {
  //     const { tokenRefresh } = parse(cookie)
  //       if ( tokenRefresh ) return tokenRefresh
  //   }
  //   return null;
  // }

}