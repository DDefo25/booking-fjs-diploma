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
import { maxImageCount, validatorImageOption } from 'src/config/file.upload.config';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';

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
  @UseInterceptors(FilesInterceptor('images[]', maxImageCount))
  @Post()
  async create(
    @UploadedFiles(
      new ParseFilePipe({ validators: validatorImageOption })
    ) images: Express.Multer.File[],
    @Body( new HttpValidationPipe()) data: Partial<Hotel>,
  ) {
    data.images = [...images.map((image) => image.path.replace(/\\/g, '/'))];
    return await this.hotelService.create(data);
  }

  /*
        Доступно только аутентифицированным пользователям с ролью admin.
    */
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async find(@Query( new HttpValidationPipe() ) query: SearchHotelParams) {
    return await this.hotelService.search(query);
  }

  /*
        Доступно только аутентифицированным пользователям с ролью admin.
    */
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('imagesFiles[]', maxImageCount))
  @Put(':id')
  async update(
    @Param('id') id: ObjectId,
    @UploadedFiles(
      new ParseFilePipe({ validators: validatorImageOption, fileIsRequired: false })
    ) imagesFiles: Express.Multer.File[],
    @Body( new HttpValidationPipe()) data: UpdateHotelParams,
  ) {
    const updateData = { ...data };
    updateData.images = Array.isArray(data.images)
      ? [...data.images, ...imagesFiles.map((image) => image.path.replace(/\\/g, '/'))]
      : [data.images, ...imagesFiles.map((image) => image.path.replace(/\\/g, '/'))];
    return await this.hotelService.update(id, updateData);
  }
}
