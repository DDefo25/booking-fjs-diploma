import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterClientDto } from './interfaces/register-user.dto';
import { LoginUserDto } from './interfaces/login-user.dto';
import { LoginUserResponseDto } from './interfaces/login-user-response.dto';
import { ConfigService } from '@nestjs/config';
import { IJwtConfiguration } from 'src/config/configuration.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createResponse({ _id, email, name, contactPhone, role }: any) {
    return {
      user: { email, name, contactPhone, role, _id },
      token: await this.createToken({ id: _id, email }),
      refreshToken: await this.createToken({ id: _id, email }, true),
    };
  }

  async validateUser(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email, ['+passwordHash']);
    if (!user) {
      return null;
    }
    return user;
  }

  async login({
    email: reqEmail,
    password: reqPass,
  }: LoginUserDto): Promise<LoginUserResponseDto> {
    const user = await this.validateUser(reqEmail);
    const isPasswordValid = await user.validateHash(reqPass);

    if (!isPasswordValid || !user) {
      throw new UnauthorizedException(
        'Пользователя с указанным email не существует или неверный пароль',
      );
    }

    return this.createResponse(user);
  }

  //Доступно только не аутентифицированным пользователям.
  async register(data: RegisterClientDto): Promise<any> {
    const { email, password } = data;
    const userExist = await this.validateUser(email);
    if (userExist) {
      throw new BadRequestException('Email уже занят');
    }
    await this.userService.create(data);
    return await this.login({ email, password });
  }

  async createToken(payload: any, refresh: boolean = false) {
    const { expiresInRefreshToken: expiresIn, secretRefreshToken: secret } =
      this.configService.get<IJwtConfiguration>('jwt');
    return await this.jwtService.signAsync(
      payload,
      refresh ? { expiresIn, secret } : null,
    );
  }

  async refreshToken(user: any) {
    return this.createResponse(user);
  }
}
