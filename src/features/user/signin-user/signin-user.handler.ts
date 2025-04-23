import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInUserCommand } from './signin-user.command';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: SignInUserCommand) {
    const { email, password } = command.signInUserDto;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (password !== user.password) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = await this.userRepository.generateToken(user.id);

    if (!token) {
      throw new UnauthorizedException('Token is not generated');
    }

    return { user, token };
  }
}
