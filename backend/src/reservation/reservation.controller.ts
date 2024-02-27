import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';
import { ObjectId } from 'mongoose';
import { Role } from 'src/auth/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/http.roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ReservationCreateRequestDto } from './interfaces/create-reservation.request.dto';
import { ReservationBetweenDto } from './interfaces/reservation.between.dto';

@Roles(Role.Client)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/:role/reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  /*
    Доступно только аутентифицированным пользователям с ролью client.

    Ошибки
    401 - если пользователь не аутентифицирован;
    403 - если роль пользователя не client.
    */
  @Get()
  async getAllReservations(@Req() req) {
    return await this.reservationService.getReservations({
      user: req.user._id,
    });
  }

  //необходима аутентификация client
  /*
        401 - если пользователь не аутентифицирован;
        403 - если роль пользователя не client;
        400 - если номера с указанным ID не существует или он отключён.
    */
  @Post()
  async createReservation(
    @Body(new HttpValidationPipe()) data: ReservationCreateRequestDto,
    @Req() req,
  ) {
    return await this.reservationService.addReservation({
      ...data,
      user: req.user,
    });
  }

  @Post('get-between')
  async reservationsBetweenDates(
    @Body(new HttpValidationPipe()) data: ReservationBetweenDto,
  ) {
    return await this.reservationService.getReservationsBetweenDates(data);
  }

  //Отмена бронирования менеджером
  /*
    Доступ
    Доступно только аутентифицированным пользователям с ролью manager.

    Ошибки
        401 - если пользователь не аутентифицирован;
        403 - если роль пользователя не manager;
        400 - если брони с указанным ID не существует.
    */
  // @Roles(Role.Manager)
  // @Delete(':id')
  // async removeReservationByManager(@Param('id') id: ObjectId) {
  //     return await this.reservationService.removeReservation(id)
  // }

  //Отмена бронирования клиентом
  /*
        Доступ
            Доступно только аутентифицированным пользователям с ролью client.

        Ошибки
            401 - если пользователь не аутентифицирован;
            403 - если роль пользователя не client;
            403 - если ID текущего пользователя не совпадает с ID пользователя в брони;
            400 - если брони с указанным ID не существует.
    */
  @Roles(Role.Manager, Role.Client)
  @Delete(':id')
  async removeReservation(
    @Param('id') id: ObjectId,
    @Param('role') role: string,
    @Req() req,
  ) {
    return await this.reservationService.removeReservation(
      id,
      role === 'client' ? req.user : null,
    );
  }

  /*
    Доступ
    Доступно только аутентифицированным пользователям с ролью manager.

    Ошибки
    401 - если пользователь не аутентифицирован;
    403 - если роль пользователя не manager.
    */
  @Roles(Role.Manager)
  @Get(':userId')
  async getReservationById(@Param('userId') user: ObjectId) {
    return await this.reservationService.getReservations({ user });
  }
}
