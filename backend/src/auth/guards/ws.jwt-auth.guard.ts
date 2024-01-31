import {ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('jwt') {
    public canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }
    public handleRequest(err, user, info) {
        if (err) {
            throw err;
        }
        if (!user) {
            throw new WsException('401 Unauthorized');
        }
        return user;
    }
}