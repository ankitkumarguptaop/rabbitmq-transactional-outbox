import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { ListProductsQuery } from './list-product.query';

@QueryHandler(ListProductsQuery)
export class GetProductsHandler implements IQueryHandler<ListProductsQuery> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: ListProductsQuery) {
    return await this.productRepository.find();
  }
}
