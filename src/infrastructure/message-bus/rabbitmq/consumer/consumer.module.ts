import { Module } from '@nestjs/common';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { ConsumerService } from './consumer.service';
import { SignatureTypesModule } from 'src/infrastructure/processors/signature-types.module';
import { HandleMessages } from 'src/infrastructure/message-bus/cli-commands/handle-messages';
import { InboxMessageHandler } from 'src/infrastructure/message-bus/inbox-message-handler.service';
import { RabbitmqModule } from 'src/infrastructure/message-bus/rabbitmq/config/rabbitmq.module';

@Module({
  imports: [SignatureTypesModule, RabbitmqModule],
  providers: [
    HandleMessages,
    ConsumerService,
    InboxMessageHandler,
    InboxMessageRepository,
  ],
})
export class ConsumerModule {}
