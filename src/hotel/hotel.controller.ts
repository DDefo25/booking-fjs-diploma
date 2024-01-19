import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SearchRoomsParams } from './interfaces/search-rooms.dto';
import { HotelService } from './hotel.service';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';
import { Hotel } from './schemas/hotel.schema';
import { SearchHotelParams } from './interfaces/search-hotel.dto';
import { ObjectId } from 'mongoose';
import { UpdateHotelParams } from './interfaces/update-hotel.dto';


@Controller('api/:role/hotels')
export class HotelController {
    constructor(
        private readonly hotelService: HotelService
    ) {}
    
    //необходима аутентификация
    @Post()
    async create( @Body(new HttpValidationPipe()) data: Partial<Hotel>) {
        return await this.hotelService.create(data)
    }

    //необходима аутентификация
    @Get()
    async find( @Query() query: SearchHotelParams) {
        return await this.hotelService.search(query)
    }

    //необходима аутентификация
    @Put(':id')
    async update( @Param('id') id: ObjectId, @Body(new HttpValidationPipe()) data: UpdateHotelParams) {
        return await this.hotelService.update( id, data );
    }
}
