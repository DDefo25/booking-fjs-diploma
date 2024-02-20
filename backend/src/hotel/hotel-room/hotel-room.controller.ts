import { Body, Controller, Get, Param, Post, Put, Query, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { SearchRoomsParams } from '../interfaces/search-rooms.dto';
import { ObjectId } from 'mongoose';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';
import { HotelRoom } from '../schemas/hotel-room.schema';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/http.roles.guard';
import { UpdateHotelRoomDto } from '../interfaces/update-hotel-room.dto';

@Controller('api/:role/hotel-rooms')
export class HotelRoomController {
    constructor(
        private readonly hotelRoomService: HotelRoomService
    ) {}


    /*
        Доступно всем пользователям, включая неаутентифицированных.
    */
    @Get()
    async findHotelRooms(@Query() query: SearchRoomsParams) {
        return await this.hotelRoomService.search(query)
    }


    /*
        Доступно всем пользователям, включая неаутентифицированных.
    */
    @Get(':id')
    async findHotelRoom(@Param('id') id: ObjectId) {
        return await this.hotelRoomService.findById( id )
    }


    /*
        Доступно только аутентифицированным пользователям с ролью admin.
    */
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    async create( @Body( new HttpValidationPipe()) data: Partial<HotelRoom>, @UploadedFiles() images: Express.Multer.File[]) {
        const newHotelRoom = {
            ...data,
            images: images.map(image => image.path)
        }
        return await this.hotelRoomService.create(newHotelRoom);
    }

    
    /*
        Доступно только аутентифицированным пользователям с ролью admin.
    */
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    @UseInterceptors(AnyFilesInterceptor())
    async update( 
        @Param('id') id: ObjectId,
        @UploadedFiles() imagesFiles: Express.Multer.File[],
        @Body() data: UpdateHotelRoomDto, 
        ) {
        console.log(data)
        const updateData = { ...data }
        updateData.images = Array.isArray(data.images) ? [
            ...data.images, 
            ...imagesFiles.map(image => image.path)
        ] : [
            data.images,
            ...imagesFiles.map(image => image.path)
        ]
        
        return this.hotelRoomService.update( id, updateData );
    }
}
