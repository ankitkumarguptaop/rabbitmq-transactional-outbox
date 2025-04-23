import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { RolesGuard } from 'src/infrastructure/guards/role.guard';
import {  QueryBus } from '@nestjs/cqrs';
import { ListProductsQuery } from './list-product.query';


@Controller('products')
@UseGuards(RolesGuard)
export class ListProductController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get()
  async listProduct(@Req() req: Request) {
    return await this.queryBus.execute(new ListProductsQuery());
  }
}
