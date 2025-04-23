import { Module } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { ListProductsQuery } from './list-product.query';
import { ListProductController } from './list-product.controller';


@Module({
  imports: [CqrsModule],
  controllers: [ListProductController],
  providers: [
    ProductRepository,
    ListProductsQuery,
  ],
})
export class ListProductModule {}
