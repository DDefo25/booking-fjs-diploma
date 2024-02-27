import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { Hotel } from './schemas/hotel.schema';
import { SearchHotelParams } from './interfaces/search-hotel.dto';
import { ObjectId } from 'mongoose';
import { UpdateHotelParams } from './interfaces/update-hotel.dto';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/http.roles.guard';
import {
  AnyFilesInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

@Controller('api/:role/hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  /*
        Доступно всем пользователям, включая неаутентифицированных.
    */
  @Get(':id')
  async findById(@Param('id') id: ObjectId) {
    return await this.hotelService.findById(id);
  }

  /*
        Доступно только аутентифицированным пользователям с ролью admin.
    */
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @Post()
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() data: Partial<Hotel>,
  ) {
    data.images = [...images.map((image) => image.path)];
    return await this.hotelService.create(data);
  }

  /*
        Доступно только аутентифицированным пользователям с ролью admin.
    */
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async find(@Query() query: SearchHotelParams) {
    return await this.hotelService.search(query);
  }

  /*
        Доступно только аутентифицированным пользователям с ролью admin.
    */
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('imagesFiles[]', 2))
  @Put(':id')
  async update(
    @Param('id') id: ObjectId,
    @UploadedFiles() imagesFiles: Express.Multer.File[],
    @Body() data: UpdateHotelParams,
  ) {
    const updateData = { ...data };
    updateData.images = Array.isArray(data.images)
      ? [...data.images, ...imagesFiles.map((image) => image.path)]
      : [data.images, ...imagesFiles.map((image) => image.path)];
    return await this.hotelService.update(id, updateData);
  }
}
