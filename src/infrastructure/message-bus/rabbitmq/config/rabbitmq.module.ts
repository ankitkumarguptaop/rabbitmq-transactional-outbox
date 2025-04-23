import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqConfigService } from './rabbitmq-config.service';
import { RabbitmqConfigurerService } from './rabbitmq-configurer.service';
import { RabbitmqConnectionService } from './rabbitmq-connection.service';
import { TypeOrmModule } from 'src/infrastructure/database/type-orm';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule],
  providers: [
    RabbitmqConfigService,
    RabbitmqConfigurerService,
    RabbitmqConnectionService,
  ],
  exports: [
    RabbitmqConfigService,
    RabbitmqConfigurerService,
    RabbitmqConnectionService,
  ],
})
export class RabbitmqModule {}
