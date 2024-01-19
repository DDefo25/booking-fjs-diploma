import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { IDBConfiguration } from '../configuration.interface';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(private configService: ConfigService) {}
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        const dbConfig = this.configService.get<IDBConfiguration>('database')
        return {
            uri: `mongodb://${dbConfig.host}:${dbConfig.port}`,
            user: dbConfig.user,
            pass: dbConfig.pass,
            dbName: dbConfig.dbName
        }
    }
}
