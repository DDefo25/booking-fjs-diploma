import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { HttpValidationPipe } from 'src/validation/http.validation.pipe';
import { ReservationCreateDto } from './interfaces/create-reservation.dto';
import { ObjectId } from 'mongoose';

@Controller('api/:role/reservations')
export class ReservationController {
    constructor (
        private readonly reservationService: ReservationService,
    ) {}
    
    /*
    Доступно только аутентифицированным пользователям с ролью client.

    Ошибки
    401 - если пользователь не аутентифицирован;
    403 - если роль пользователя не client.
    */
    @Get()
    async getAllReservations() {
        return await this.reservationService.getReservations({})
    }
    
    
    //необходима аутентификация client
    /*
        401 - если пользователь не аутентифицирован;
        403 - если роль пользователя не client;
        400 - если номера с указанным ID не существует или он отключён.
    */
    @Post()
    async createReservation( @Body( new HttpValidationPipe()) data: ReservationCreateDto) {
        return await this.reservationService.addReservation(data)
    }

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
    @Delete(':id')
    async removeReservationByClient(@Param('id') id: ObjectId) {
        return await this.reservationService.removeReservation(id)
    }

    /*
    Доступ
    Доступно только аутентифицированным пользователям с ролью manager.

    Ошибки
    401 - если пользователь не аутентифицирован;
    403 - если роль пользователя не manager.
    */
    @Get(':id')
    async getReservationById(@Param('id') id: ObjectId) {
        return await this.reservationService.removeReservation(id)
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
    @Delete(':id')
    async removeReservationByManager(@Param('id') id: ObjectId) {
        return await this.reservationService.removeReservation(id)
    }
}
