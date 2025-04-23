import { Module } from '@nestjs/common';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { ProducerService } from './producer.service';
import { RabbitmqModule } from 'src/infrastructure/message-bus/rabbitmq/config/rabbitmq.module';
import { DispatchMessages } from 'src/infrastructure/message-bus/cli-commands/dispatch-messages';
import { OutboxMessageRelay } from 'src/infrastructure/message-bus/outbox-message-relay.service';

@Module({
  imports: [RabbitmqModule],
  providers: [
    DispatchMessages,
    ProducerService,
    OutboxMessageRepository,
    OutboxMessageRelay,
  ],
})
export class ProducerModule {}
