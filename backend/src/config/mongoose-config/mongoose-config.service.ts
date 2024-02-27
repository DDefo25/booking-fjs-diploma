import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { IDBConfiguration } from '../configuration.interface';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    const { user, pass, dbName, host, port } =
      this.configService.get<IDBConfiguration>('database');
    return {
      uri: `mongodb://${host}:${port}`,
      user,
      pass,
      dbName,
    };
  }
}
