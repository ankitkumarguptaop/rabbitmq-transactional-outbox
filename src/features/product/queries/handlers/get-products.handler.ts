import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductsQuery } from '../get-products.query';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: GetProductsQuery) {
    return await this.productRepository.find();
  }
}
