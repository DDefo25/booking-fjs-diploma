import { Controller, Get, Query, Res } from '@nestjs/common';
import * as path from 'path';
import { Observable, of } from 'rxjs';

@Controller('api/:role/download')
export class FileController {
  @Get('image')
  downloadImg(
    @Query('img_path') imgPath: string,
    @Res() res,
  ): Observable<object> {
    return of(res.sendFile(path.join(`${process.cwd()}/${imgPath}`)));
  }
}
