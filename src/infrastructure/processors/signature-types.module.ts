import { Module } from '@nestjs/common';

import { LazyLoadHandler } from './lazy-loader.service';

import { SignatureTypes } from './signature-types.service';
import { ProductCreatedModule } from './product-created/product-created.module';

@Module({
  imports: [
    ProductCreatedModule,
  ],
  providers: [SignatureTypes, LazyLoadHandler],
  exports: [SignatureTypes],
})
export class SignatureTypesModule {}
