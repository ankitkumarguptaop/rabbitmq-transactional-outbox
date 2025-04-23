import { Event } from 'src/domain/common/event';

export class ProductSucessfullyCreated extends Event {
  constructor(payload) {
    super(payload);
    this.type = 'product-service.product-created';
  }

  getBody() {
    return {
      product: this.payload,
    };
  }
}
