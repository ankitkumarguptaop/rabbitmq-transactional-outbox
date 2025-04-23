import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { NotFoundException } from '@nestjs/common';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { CreateProductCommand } from './create-product.command';
import { ProductSucessfullyCreated } from 'src/domain/product/events/product-create';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly outboxMessageRepository: OutboxMessageRepository,
  ) {}

  async execute(command: CreateProductCommand) {
    const { body, user } = command;

    const product = await this.productRepository.createProduct({
      user_id: user.id,
      name: body.name,
      price: body.price,
      description: body.description,
    });

    if (!product) {
      throw new NotFoundException('Product not created');
    }

    // const outboxMessage = await this.OutboxMessageRepository.createMessage({
    //   message: product,
    //   signature: 'sendMessage',
    //   routing_key: 'Message',
    //   type: 'direct',
    //   status: 'PENDING',
    // });


    await this.outboxMessageRepository.storeOutboxMessage(
        new ProductSucessfullyCreated({
          product_id : product.id,
          name: product.name,
          description: body.description,
          arrived_at: new Date(),
        }),
      );

    return product;
  }
}
