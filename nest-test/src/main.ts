import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import * as helmet from 'helmet';
import session from 'express-session';

// import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.use(
    session({
      secret: 'nest test',
      resave: false,
      saveUninitialized: true,
    }),
  );
  app.use(helmet());
  await app.listen(config.port);
}
bootstrap();
