import { Module } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { GetProductController } from './get-product.controller';
import { GetProductHandler } from './get-product.handler';

@Module({
  imports: [CqrsModule],
  controllers: [GetProductController],
  providers: [
    ProductRepository,
    GetProductHandler,

  ],
})
export class GetProductModule {}
