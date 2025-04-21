import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../get-user.query';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserQuery) {
    return await this.userRepository.findUser(query.id);
  }
}
