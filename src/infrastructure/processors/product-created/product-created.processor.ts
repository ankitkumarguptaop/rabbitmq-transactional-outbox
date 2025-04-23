import { InjectRepository } from '@nestjs/typeorm';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { Transactional } from 'typeorm-transactional';
import { EventPayload } from '../common/event.interface';
import { ProductCreatedHandler } from './product-created.handler';
import { ProductCreatedBody } from './product-created.interface';
import { ProductCreatedCommand } from './product-created.command';

export class ProductCreatedProcessor {
  constructor(
    @InjectRepository(InboxMessageRepository)
    private inboxMessageRepository: InboxMessageRepository,
    private handler: ProductCreatedHandler,
  ) {}

  getHandlerName(): string {
    return this.constructor.name;
  }

  @Transactional()
  async handleEvent(payload: EventPayload<ProductCreatedBody>) {
    //Processing of the event
    const { product_id, name } = payload.body.product;

    const command = new ProductCreatedCommand(
        product_id,
        name,
    );

    await this.handler.handle(command);

    await this.inboxMessageRepository.storeInboxMessage({
      message_id: payload.messageId,
      handler_name: this.getHandlerName(),
    });
  }
}
