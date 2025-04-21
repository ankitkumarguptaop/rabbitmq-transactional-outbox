import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { UserEmailAlreadyExistsConflict } from 'src/domain/user/exceptions/exception';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand) {
    const userAlredyExist = await this.userRepository.findOne({
      where: {
        email: command.createUserDto.email,
      },
    });
    if (userAlredyExist) {
      throw new UserEmailAlreadyExistsConflict();
    }

    return await this.userRepository.createUser(command.createUserDto);
  }
}
