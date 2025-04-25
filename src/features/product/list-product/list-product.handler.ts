import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { ListProductQuery } from './list-product.query';

@QueryHandler(ListProductQuery)
export class listProductHandler implements IQueryHandler<ListProductQuery> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: ListProductQuery) {
    return await this.productRepository.find();
  }
}
