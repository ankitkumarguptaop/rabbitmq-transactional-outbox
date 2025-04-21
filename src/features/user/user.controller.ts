// user.controller.ts
import { Body, Controller, Post, Get, Param, Res } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';
import { SignInUserCommand } from './commands/signin-user.command';

import { CreateUserDto } from './create-user.dto';
import { SignInUserDto } from './signin-user.dto';
import { Response } from 'express';
import { GetUsersQuery } from './queries/get-users.query';
import { GetUserQuery } from './queries/get-user.query';

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  @Post('/signin')
  async signin(@Body() dto: SignInUserDto, @Res() res: Response) {
    const { user, token } = await this.commandBus.execute(
      new SignInUserCommand(dto),
    );
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.json({ message: 'Login successful', user });
  }

  @Get()
  listUser() {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.queryBus.execute(new GetUserQuery(+id));
  }
}
