import { Injectable } from '@nestjs/common';
import { Event } from 'src/domain/common/event';
import { OutBoxStatus } from 'src/domain/outbox-message/enums/outbox-status.enum';
import { OutboxMessage } from 'src/domain/outbox-message/outbox-message.entity';

import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OutBoxMessageRepository extends Repository<OutboxMessage> {
  constructor(private dataSource: DataSource) {
    super(OutboxMessage, dataSource.createEntityManager());  
  }

  async createMessage(payload: Event|any): Promise<any> {
    return await this.save(payload);
  }


  async listPendingMessages(): Promise<any> {
    return await this.find({
      where: {
        status: OutBoxStatus.PENDING,
      },
    });
  }

  async updateProduct(id: number, payload: any): Promise<any> {
    await this.update(id, {
      ...(payload.name && { name: payload.name }),
      ...(payload.password && { password: payload.password }),
    });
    return await this.findOne({
      where: {
        id: id,
      },
    });
  }
}
