import { Body, Controller, Get, Param, Post, Put, Query, Request, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { SearchRoomsParams } from '../interfaces/search-rooms.dto';
import { ObjectId } from 'mongoose';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';
import { HotelRoom } from '../schemas/hotel-room.schema';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/:role/hotel-rooms')
export class HotelRoomController {
    constructor(
        private readonly hotelRoomService: HotelRoomService
    ) {}

    @Get()
    async findHotelRooms(@Query() query: SearchRoomsParams) {
        return await this.hotelRoomService.search(query)
    }

    @Get(':id')
    async findHotelRoom(@Param('id') id: ObjectId) {
        return await this.hotelRoomService.findById( id )
    }

    //необходима аутентификация
    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    async create( @Body( new HttpValidationPipe()) data: Partial<HotelRoom>, @UploadedFiles() images: Express.Multer.File[]) {
        console.log(images)
        const newHotelRoom = {
            ...data,
            images: images.map(image => image.path)
        }
        return await this.hotelRoomService.create(newHotelRoom);
    }

    //необходима аутентификация
    @Put(':id')
    @UseInterceptors(FilesInterceptor('images'))
    async update( 
        @Param('id') id: ObjectId,
        @UploadedFiles() images: Express.Multer.File[],
        @Body(new HttpValidationPipe()) data: Partial<HotelRoom>, 
        ) {
        const updateData = { ...data }
        updateData.images = Array.isArray(data.images) ? [
            ...data.images, 
            ...images.map(image => image.path)
        ] : [
            data.images,
            ...images.map(image => image.path)
        ]
        
        return this.hotelRoomService.update( id, updateData );
    }
}
