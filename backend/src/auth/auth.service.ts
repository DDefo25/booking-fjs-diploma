import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterClientDto } from './interfaces/register-user.dto';
import { LoginUserDto } from './interfaces/login-user.dto';
import { LoginUserResponseDto } from './interfaces/login-user-response.dto';

@Injectable()
export class AuthService {
    constructor (
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string): Promise<any> {
        const user = await this.userService.findByEmail( email, ['+passwordHash'])
        if (!user) {
            return null;
        }
        return user;
    }

    async login({email, password: pass}: LoginUserDto): Promise<LoginUserResponseDto> {
        const user = await this.validateUser( email )
        const isPasswordValid = await user.validateHash( pass )
        
        if (!isPasswordValid || !user) {
            throw new UnauthorizedException('Пользователя с указанным email не существует или неверный пароль');
        }

        const payload = { 
            id: user._id, 
            email: user.email, 
            role: user.role
        };
        
        return {
            user: {
                email: user.email,
                name: user.name,
                contactPhone: user.contactPhone
            },
            accessToken: await this.createToken(payload),
        };
    }

    //Доступно только не аутентифицированным пользователям.
    async register(data: RegisterClientDto): Promise<any> {
        const { email, password } = data;
        console.log(data)
        const userExist = await this.validateUser(email)
        if (userExist) {
            throw new BadRequestException('Email уже занят')
        }
        await this.userService.create(data);
        return await this.login({email, password})

      }

    async createToken(payload: any) {
        return await this.jwtService.signAsync(payload);
    }
}
