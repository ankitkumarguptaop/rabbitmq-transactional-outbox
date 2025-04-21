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
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { Request } from 'express';
import { RolesGuard } from 'src/infrastructure/guards/role.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './commands/create-product.command';
import { GetProductQuery } from './queries/get-product.query';
import { GetProductsQuery } from './queries/get-products.query';

@Controller('products')
@UseGuards(RolesGuard)
export class ProductController {
 constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
    create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: Request,
  ) {
    
    // return this.commandBus.createProduct({
    //   user: req.user,
    //   body: createProductDto,
    // });


    return this.commandBus.execute(new CreateProductCommand(req.user ,createProductDto))
  }

  @Get()
  async listProduct(@Req() req: Request) {
    return await this.queryBus.execute(new GetProductsQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.queryBus.execute(new GetProductQuery(+id));
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateProductDto: UpdateProductDto,
  // ) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
