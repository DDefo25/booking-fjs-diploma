import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: true,
    exposedHeaders: ['Authorization'],
  });
  app.use(cookieParser());

  //dev. создает искусственную задержку
  // app.use((req, res, next) => {
  //   setTimeout(() => next(), 2000);
  // });
  await app.listen(process.env.PORT);
}
bootstrap();
