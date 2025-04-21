import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { GetProductHandler } from './queries/handlers/get-product.handler';
import { GetProductsHandler } from './queries/handlers/get-products.handler';
import { CreateProductHandler } from './commands/handlers/create-product.handler';
import { OutBoxMessageRepository } from 'src/infrastructure/repositories/outbox-messsage/outbox-message.repository';

@Module({
  imports: [CqrsModule],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    GetProductHandler,
    GetProductsHandler,
    CreateProductHandler,
    OutBoxMessageRepository
  ],
})
export class ProductModule {}
