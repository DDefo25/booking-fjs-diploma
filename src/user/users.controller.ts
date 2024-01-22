import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/user/interfaces/create-user.dto';
import { UserService } from 'src/user/user.service';
import { getHash } from 'src/utility/cryptPass';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';
import { SearchUserParams } from './interfaces/search-user.dto';

@Controller('/api/:role/users')
export class UsersController {
    constructor( private readonly userService: UserService) {}
    
    /*
    Доступ
    Доступно только пользователям с ролью admin.

    Ошибки
    401 - если пользователь не аутентифицирован;
    403 - если роль пользователя не admin.
    */
    @Post()
    async create(@Body(new HttpValidationPipe()) data: CreateUserDto) {
        data['passwordHash'] = data.password
        return await this.userService.create(data)
    }


    /*
    Доступ
    GET /api/admin/users/
    Доступно только пользователям с ролью admin.

    GET /api/manager/users/
    Доступно только пользователям с ролью manager.

    Ошибки
    401 - если пользователь не аутентифицирован;
    403 - если роль пользователя не подходит.
    */
    @Get()
    async getAll(@Query() query: SearchUserParams) {
        return await this.userService.findAll(query)
    }
}
