import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SearchRoomsParams } from './interfaces/search-rooms.dto';
import { HotelService } from './hotel.service';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';
import { Hotel } from './schemas/hotel.schema';
import { SearchHotelParams } from './interfaces/search-hotel.dto';
import { ObjectId } from 'mongoose';
import { UpdateHotelParams } from './interfaces/update-hotel.dto';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/http.roles.guard';

@Roles(Role.Admin, Role.Client)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/:role/hotels')
export class HotelController {
    constructor(
        private readonly hotelService: HotelService
    ) {}
    
    
    /*
        Доступно только аутентифицированным пользователям с ролью admin.
    */
    @Post()
    async create( @Body(new HttpValidationPipe()) data: Partial<Hotel>) {
        return await this.hotelService.create(data)
    }


    /*
        Доступно только аутентифицированным пользователям с ролью admin.
    */
    @Get()
    async find( @Query() query: SearchHotelParams) {
        return await this.hotelService.search(query)
    }


    /*
        Доступно только аутентифицированным пользователям с ролью admin.
    */
    @Put(':id')
    async update( @Param('id') id: ObjectId, @Body(new HttpValidationPipe()) data: UpdateHotelParams) {
        return await this.hotelService.update( id, data );
    }
}
