import { User } from 'src/domain/user/user.entity';
import { CreateProductDto } from '../create-product.dto';

export class CreateProductCommand {
  constructor(
    public readonly user: User,
    public readonly body: CreateProductDto,
  ) {}
}
