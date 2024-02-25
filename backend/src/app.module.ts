import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration' 
import { UserModule } from './user/user.module';
import { HotelModule } from './hotel/hotel.module';
import { ReservationModule } from './reservation/reservation.module';
import { SupportChatModule } from './support-chat/support-chat.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseConfigService } from './config/mongoose-config/mongoose-config.service';
import { AuthModule } from './auth/auth.module';
import { SupportRequestController } from './support-chat/support-request.controller';
import { FileModule } from './file-module/file-module.module';
import { SocketService } from './socket/socket.service';
import { AppGateway } from './app.gateway';
import { SocketModule } from './socket/socket.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),

    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),

    EventEmitterModule.forRoot(),

    UserModule,
    HotelModule,
    ReservationModule,
    SupportChatModule,
    FileModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppGateway
  ],
})
export class AppModule {}
