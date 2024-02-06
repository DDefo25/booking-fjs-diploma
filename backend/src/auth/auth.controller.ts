import { Body, Controller, Post, Redirect, Res, UseGuards } from '@nestjs/common';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';
import { AuthService } from './auth.service';
import { LoginUserDto } from './interfaces/login-user.dto';
import { Response } from 'express';
import { RegisterClientDto } from './interfaces/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { ICookiesConfiguration } from 'src/config/configuration.interface';

@Controller('/api')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) {}
    
    //Доступно только не аутентифицированным пользователям.
    @Post('/auth/login')
    async login( 
        @Body( new HttpValidationPipe()) data: LoginUserDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const cookiesConfig = this.configService.get<ICookiesConfiguration>('cookies')
        const userWithToken = await this.authService.login(data)
        res.cookie('token', userWithToken.accessToken, {expires: new Date(Date.now() + cookiesConfig.expires)})

        return userWithToken.user
    }

    //Доступно только аутентифицированным пользователям.
    @UseGuards(JwtAuthGuard)
    @Post('/auth/logout')
    async logout(
        @Res({ passthrough: true }) res: Response
    ) {
    // Some internal checks
        res.cookie('token', '', { expires: new Date() });
    }

    //Доступно только не аутентифицированным пользователям.
    @Post('/client/register')
    async register( 
        @Body( new HttpValidationPipe()) data: RegisterClientDto, 
        @Res({ passthrough: true }) res: Response
    ) {
        data['passwordHash'] = data.password
        const userWithToken = await this.authService.register(data)

        const cookiesConfig = this.configService.get<ICookiesConfiguration>('cookies')
        res.cookie('token', userWithToken.accessToken, {expires: new Date(Date.now() + cookiesConfig.expires)})

        return userWithToken.user
    }
}
