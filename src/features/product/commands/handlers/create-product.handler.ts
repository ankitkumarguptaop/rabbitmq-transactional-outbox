import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../create-product.command';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { NotFoundException } from '@nestjs/common';
import { OutBoxMessageRepository } from 'src/infrastructure/repositories/outbox-messsage/outbox-message.repository';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly OutBoxMessageRepository: OutBoxMessageRepository,
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

    const outboxMessage = await this.OutBoxMessageRepository.createMessage({
      message: product,
      signature: 'sendMessage',
      routing_key: 'Message',
      type: 'direct',
      status: 'PENDING',
    });

    if (!outboxMessage) {
      throw new NotFoundException('OutboxMessage not created');
    }

    return product;
  }
}
