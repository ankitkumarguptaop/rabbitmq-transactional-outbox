import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'ormconfig';
import { AuthenticationMiddleware } from './infrastructure/middlewares/auth.middleware';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductModule } from './features/product/create-product/create-product.module';
import { CreateUserModule } from './features/user/create-user/create-user.module';
import { GetProductModule } from './features/product/get-product/get-product.module';
import { ListProductModule } from './features/product/list-product/list-product.module';
import { SignInUserModule } from './features/user/signin-user/signin-user.module';
import { RabbitmqModule } from './infrastructure/message-bus/rabbitmq/config/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //for env and validation of entity (configmodule)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        dataSourceOptions(configService),
      inject: [ConfigService],
    }),
    CreateProductModule,
    CreateUserModule,
    GetProductModule,
    ListProductModule,
    SignInUserModule,
    CqrsModule,
    RabbitmqModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude(
        { path: 'users/signin', method: RequestMethod.POST },
        { path: 'users/signup', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
