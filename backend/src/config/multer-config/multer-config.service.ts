import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { IUploadConfiguration } from '../configuration.interface';
import { diskStorage } from 'multer'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private configService: ConfigService) {}
  
  createMulterOptions(): MulterModuleOptions {
    const uploadConfig = this.configService.get<IUploadConfiguration>('upload')

    const storage = diskStorage({
      destination: function (req, file, cb) {
        const filePath = path.join(`${uploadConfig.destination}/hotel/${req.body.hotel}`)
        fs.mkdirSync(filePath, { recursive: true })
        cb(null, filePath)
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      }
    })

    return { storage };
  }
}