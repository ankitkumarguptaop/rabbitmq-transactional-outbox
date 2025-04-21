import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './infrastructure/exceptions/all-exception-fillters';
import { DtoValidation } from './infrastructure/exceptions/exceptions';
import { ValidationError } from 'class-validator';
import { LoggingInterceptor } from './infrastructure/interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new DtoValidation(errors);
      },
    }),
  );
  app.use(cookieParser());
  const configService = app.get(ConfigService);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalInterceptors(new LoggingInterceptor());
  const port = configService.get<number>('APP_PORT') || 8080;

  await app.listen(port);
}
bootstrap();
