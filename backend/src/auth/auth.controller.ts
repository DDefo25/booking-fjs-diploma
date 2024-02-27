import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';
import { AuthService } from './auth.service';
import { LoginUserDto } from './interfaces/login-user.dto';
import { Response, Request } from 'express';
import { RegisterClientDto } from './interfaces/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { ICookiesConfiguration } from 'src/config/configuration.interface';
import { JwtCookiesAuthGuard } from './guards/jwt-cookies-auth.guard';

@Controller('/api')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  //Доступно только не аутентифицированным пользователям.
  @Post('/auth/login')
  async login(
    @Body(new HttpValidationPipe()) data: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token, refreshToken } = await this.authService.login(data);
    const cookiesConfig =
      this.configService.get<ICookiesConfiguration>('cookies');

    res.cookie('refreshToken', refreshToken, {
      expires: new Date(Date.now() + cookiesConfig.expires),
    });
    return { user, token };
  }

  //Доступно только аутентифицированным пользователям.
  @UseGuards(JwtAuthGuard)
  @Post('/auth/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('refreshToken', '', { expires: new Date(Date.now()) });
    return { success: true };
  }

  //Доступно только не аутентифицированным пользователям.
  @Post('/client/register')
  async register(
    @Body(new HttpValidationPipe()) data: RegisterClientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    data['passwordHash'] = data.password;
    const { user, token, refreshToken } = await this.authService.register(data);
    const cookiesConfig =
      this.configService.get<ICookiesConfiguration>('cookies');

    res.cookie('refreshToken', refreshToken, {
      expires: new Date(Date.now() + cookiesConfig.expires),
    });
    return { user, token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/auth/get-user')
  async getUser(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtCookiesAuthGuard)
  @Get('/auth/refresh')
  async refreshToken(
    @Req() { user }: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cookiesConfig =
      this.configService.get<ICookiesConfiguration>('cookies');

    const {
      user: userResponse,
      token,
      refreshToken,
    } = await this.authService.refreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      expires: new Date(Date.now() + cookiesConfig.expires),
    });
    return { user: userResponse, token };
  }
}
