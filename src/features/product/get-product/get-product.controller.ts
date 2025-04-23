import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { RolesGuard } from 'src/infrastructure/guards/role.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProductQuery } from './get-product.query';

@Controller('products')
@UseGuards(RolesGuard)
export class GetProductController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.queryBus.execute(new GetProductQuery(+id));
  }
}
