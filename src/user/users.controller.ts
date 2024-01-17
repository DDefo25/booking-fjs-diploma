import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/interfaces/create-user.dto';
import { UserService } from 'src/user/user.service';
import { getHash } from 'src/utility/cryptPass';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';

@Controller('users')
export class UsersController {
    constructor( private readonly userService: UserService) {}
    
    @Post()
    async create(@Body(new HttpValidationPipe()) data: CreateUserDto) {
        data['passwordHash'] = data.password
        return this.userService.create(data) 
    }
}
