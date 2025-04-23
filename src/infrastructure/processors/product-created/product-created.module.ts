import { Module } from '@nestjs/common';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { ProductCreatedCommand } from './product-created.command';
import { ProductCreatedHandler } from './product-created.handler';
import { ProductCreatedProcessor } from './product-created.processor';

@Module({
  imports: [],
  providers: [
    ProductCreatedProcessor,
    InboxMessageRepository,
    ProductCreatedCommand,
    ProductCreatedHandler,
  ],
  exports: [ProductCreatedProcessor],
})


export class ProductCreatedModule {}
