import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { SearchRoomsParams } from '../interfaces/search-rooms.dto';
import { ObjectId } from 'mongoose';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';
import {
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/http.roles.guard';
import { UpdateHotelRoomDto } from '../interfaces/update-hotel-room.dto';
import { CreateHotelRoomDto } from '../interfaces/create-hotel-room.dto';
import { maxImageCount, validatorImageOption } from 'src/config/file.upload.config';

@Controller('api/:role/hotel-rooms')
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  /*
        Доступно всем пользователям, включая неаутентифицированных.
    */
  @Get()
  async findHotelRooms(
    @Query(new HttpValidationPipe()) query: SearchRoomsParams,
  ) {
    return await this.hotelRoomService.search(query);
  }

  /*
        Доступно всем пользователям, включая неаутентифицированных.
    */
  @Get(':id')
  async findHotelRoom(@Param('id') id: ObjectId) {
    return await this.hotelRoomService.findById(id);
  }

  /*
        Доступно только аутентифицированным пользователям с ролью admin.
    */
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('images[]', maxImageCount))
  @Post()
  async create(
    @UploadedFiles(
      new ParseFilePipe({ validators: validatorImageOption })
    ) images: Express.Multer.File[],
    @Body( new HttpValidationPipe()) data: CreateHotelRoomDto,
  ) {
    const newHotelRoom = {
      ...data,
      images: images.map((image) => image.path.replace(/\\/g, '/')),
    };
    return await this.hotelRoomService.create(newHotelRoom);
  }

  /*
        Доступно только аутентифицированным пользователям с ролью admin.
    */
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @UseInterceptors(FilesInterceptor('imagesFiles[]', maxImageCount))
  async update(
    @Param('id') id: ObjectId,
    @UploadedFiles(
      new ParseFilePipe({ validators: validatorImageOption, fileIsRequired: false })
    ) imagesFiles: Express.Multer.File[],
    @Body(new HttpValidationPipe()) data: UpdateHotelRoomDto,
  ) {
    const updateData = { ...data };
    updateData.images = Array.isArray(data.images)
      ? [...data.images, ...imagesFiles.map((image) => image.path.replace(/\\/g, '/'))]
      : [data.images, ...imagesFiles.map((image) => image.path.replace(/\\/g, '/'))];

    return this.hotelRoomService.update(id, updateData);
  }
}
