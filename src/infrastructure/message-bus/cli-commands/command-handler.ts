import { CommandFactory } from 'nest-commander';
import { ConsumerModule } from 'src/infrastructure/message-bus/rabbitmq/consumer/consumer.module';
import { ProducerModule } from 'src/infrastructure/message-bus/rabbitmq/producer/producer.module';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();
  const commandModuleMapper: { [key: string]: any } = {
    'dispatch-messages': ProducerModule,
    'handle-messages': ConsumerModule,
  };

  const command = process.argv.slice(2)[0];

  await CommandFactory.runWithoutClosing(commandModuleMapper[command], [
    'warn',
    'error',
  ]);
}

bootstrap();
