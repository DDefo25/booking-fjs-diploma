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
        JwtStrategy.extractJWT,
        JwtStrategy.extractJWTFromWS,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser( payload.email )
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private static extractJWT(req: RequestType): string | null {
    if (
      req.cookies &&
      'token' in req.cookies &&
      req.cookies.token.length > 0
    ) {
      return req.cookies.token;
    }
    return null;
  }

  private static extractJWTFromWS(req: Socket): string | null {
    if ( 
      req.handshake &&
      req.handshake.headers && 
      req.handshake.headers.cookie
      ) {
        const cookies = parse(req.handshake.headers.cookie)
        if (
          cookies &&
          'token' in cookies &&
          cookies.token.length > 0
        ) {
          return cookies.token;
        }
      }
    
    return null;
  }

}