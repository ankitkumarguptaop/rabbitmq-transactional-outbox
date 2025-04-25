import { Module } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { ListProductQuery } from './list-product.query';
import { ListProductController } from './list-product.controller';
import { listProductHandler } from './list-product.handler';


@Module({
  imports: [CqrsModule],
  controllers: [ListProductController],
  providers: [
    ProductRepository,
    ListProductQuery,
    listProductHandler
  ],
})
export class ListProductModule {}
