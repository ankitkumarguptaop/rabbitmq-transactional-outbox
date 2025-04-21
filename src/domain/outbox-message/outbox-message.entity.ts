import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { OutBoxStatus } from './enums/outbox-status.enum';
import { Optional } from '@nestjs/common';
  
  @Entity('outbox-message')
  export class OutboxMessage {
    @PrimaryGeneratedColumn('increment')
    id: number;
   
    @Optional()
    @Column({ unique: true })
    message_id: number;
  
    @Column({ type: 'varchar', length: 255 })
    type: string;
  
    @Column()
    routing_key: string;
  
    @Column()
    message: string;

    @Column()
    signature: string;
  
    @Column({ type: 'enum', enum: OutBoxStatus, default: OutBoxStatus.PENDING })
    status: OutBoxStatus;

  }