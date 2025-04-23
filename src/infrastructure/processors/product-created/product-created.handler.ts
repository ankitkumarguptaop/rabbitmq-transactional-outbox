import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCreatedCommand } from './product-created.command';


@Injectable()
export class ProductCreatedHandler {
  constructor(
  ) {}

  async handle(command: ProductCreatedCommand) {
    const {product_id ,name } = command;

    console.log(` ==========================product with  id ${product_id} and name ${name} is created n=========================================== ` )
  }
}
