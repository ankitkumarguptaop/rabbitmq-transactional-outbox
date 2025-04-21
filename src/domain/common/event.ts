
export class Event {
  message_id: number;
  type: string;
  message: string;
  routing_key: string;
  signature: string;
  status: 'PENDING' | 'SENT';

  constructor(payload) {}
 
  
}
