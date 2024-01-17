import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration' 
import { MongooseConfigService } from './mongoose-config/mongoose-config.service';
import { UserModule } from './user/user.module';
import { UsersController } from './users/users.controller';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    UserModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'admin',
            module: UserModule
          },
        ],
      },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
