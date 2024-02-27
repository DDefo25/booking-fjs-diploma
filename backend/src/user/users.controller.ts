import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/interfaces/create-user.dto';
import { UserService } from 'src/user/user.service';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';
import { SearchUserParams } from './interfaces/search-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/http.roles.guard';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/api/:role/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  /*
    Доступ
    Доступно только пользователям с ролью admin.

    Ошибки
    401 - если пользователь не аутентифицирован;
    403 - если роль пользователя не admin.
    */

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body(new HttpValidationPipe()) data: CreateUserDto) {
    
    data['passwordHash'] = data.password;
    return await this.userService.create(data);
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
  @Roles(Role.Admin, Role.Manager)
  @Get()
  async getAll(@Query() query: SearchUserParams) {
    return await this.userService.findAll(query);
  }

  // @Roles( Role.Admin )
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get('profile')
  // profile(@Req() req, @Res() res) {
  //     res.status(HttpStatus.OK).json(req.user)
  // }
}
