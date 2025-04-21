import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from '../get-product.query';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: GetProductQuery) {
    return await this.productRepository.getProduct(query.id);
  }
}
