import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductDto } from './create-product.dto';
import { CreateProductCommand } from './create-product.command';

@Controller('products')
export class CreateProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
    // return this.commandBus.createProduct({
    //   user: req.user,
    //   body: createProductDto,
    // });

    return this.commandBus.execute(
      new CreateProductCommand(req.user, createProductDto),
    );
  }
}
