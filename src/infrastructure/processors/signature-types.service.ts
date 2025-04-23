import { Injectable } from '@nestjs/common';

import { LazyLoadHandler } from './lazy-loader.service';

import { ProductCreatedModule } from './product-created/product-created.module';
import { ProductCreatedProcessor } from './product-created/product-created.processor';

@Injectable()
export class SignatureTypes {
  constructor(private readonly lazyLoader: LazyLoadHandler) {}

  public signatureTypes: Record<string, any[]> = {
    'product-service.product-created': [
      this.lazyLoader.handle(ProductCreatedModule, ProductCreatedProcessor),
    ],
  };

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
