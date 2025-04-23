// user.controller.ts
import { Body, Controller, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { SignInUserDto } from './signin-user.dto';
import { Response } from 'express';
import { SignInUserCommand } from './signin-user.command';


@Controller('users')
export class SignInUserController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}


  @Post('/signin')
  async signin(@Body() data: SignInUserDto, @Res() res: Response) {
    const { user, token } = await this.commandBus.execute(
      new SignInUserCommand(data),
    );
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.json({ message: 'Login successful', user });
  }

}
