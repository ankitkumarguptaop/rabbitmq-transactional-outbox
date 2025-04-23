import { Injectable } from '@nestjs/common';
import { InboxMessage } from 'src/domain/inbox-message/inbox-message.entity';
import { DataSource, Repository } from 'typeorm';
import { InboxMessagePayload } from './inbox-message.interface';

@Injectable()
export class InboxMessageRepository extends Repository<InboxMessage> {
  constructor(dataSource: DataSource) {
    super(InboxMessage, dataSource.createEntityManager());
  }

  async storeInboxMessage(payload: InboxMessagePayload) {
    return await this.save(payload);
  }

  async getInboxMessageById(message_id: string, handler_name: string) {
    const criteria = { message_id, handler_name };
    return await this.findOne({ where: criteria });
  }
}
