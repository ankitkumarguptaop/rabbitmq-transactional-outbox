import { Module } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { CreateProductController } from './create-product.controller';
import { CreateProductHandler } from './create-product.handler';

@Module({
  imports: [CqrsModule],
  controllers: [CreateProductController],
  providers: [
    ProductRepository,
    CreateProductHandler,
    OutboxMessageRepository
  ],
})
export class CreateProductModule {}
