import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SearchRoomsParams } from './interfaces/search-rooms.dto';
import { HotelService } from './hotel.service';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';
import { Hotel } from './schemas/hotel.schema';
import { SearchHotelParams } from './interfaces/search-hotel.dto';
import { ObjectId } from 'mongoose';
import { UpdateHotelParams } from './interfaces/update-hotel.dto';


@Controller('hotels')
export class HotelController {
    constructor(
        private readonly hotelService: HotelService
    ) {}
    
    //необходима аутентификация
    //необходима пагинация/offset
    @Post()
    async create( @Body(new HttpValidationPipe()) data: Partial<Hotel>) {
        return await this.hotelService.create(data)
    }


    //необходима пагинация/offset
    @Get()
    async find( @Query() query: SearchHotelParams) {
        return await this.hotelService.search(query)
    }

    //необходима аутентификация
    @Put(':id')
    async update( @Param() id: ObjectId, @Body(new HttpValidationPipe()) data: UpdateHotelParams) {
        return this.hotelService.update( id, data );
    }
}
