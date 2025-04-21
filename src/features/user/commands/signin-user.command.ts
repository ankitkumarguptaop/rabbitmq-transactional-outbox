import { SignInUserDto } from '../signin-user.dto';

export class SignInUserCommand {
  constructor(
    public readonly signInUserDto: SignInUserDto,
  ) {}
}