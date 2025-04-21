import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInUserCommand } from '../signin-user.command';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { UnauthorizedException } from '@nestjs/common';
const jwt = require('jsonwebtoken');
@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private configService: ConfigService,
  ) {}

  generateToken = (id: number) => {
    return jwt.sign(
      { id },
      this.configService.get<number>('JWT_SECRET') || 'nbvtyv',
      {
        expiresIn: '3d',
      },
    );
  };

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
    const token = await this.generateToken(user.id);

    return { user, token };
  }
}
