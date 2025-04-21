import { Injectable } from '@nestjs/common';
import { Product } from 'src/domain/product/product.entity';
import { CreateProductDto } from 'src/features/product/create-product.dto';

import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());  
  }

  async createProduct(payload: CreateProductDto): Promise<any> {
    return await this.save(payload);
  }

  async getProduct(id: number): Promise<any> {
    return await this.findOne({
      where: {
        id: id,
      },
    });
  }

  async listProduct(user_id: number): Promise<any> {
    return await this.find({
      where: {
        user_id: user_id,
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
