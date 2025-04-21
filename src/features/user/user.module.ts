import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/user/user.entity';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { SignInUserHandler } from './commands/handlers/signin-user.handler';
import { GetUsersHandler } from './queries/handlers/get-users.handler';
import { GetUserHandler } from './queries/handlers/get-user.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([User]) , CqrsModule],
  controllers: [UserController],
  providers: [
    UserRepository,
    CreateUserHandler,
    SignInUserHandler,
    GetUsersHandler,
    GetUserHandler,
  ],
  exports: [TypeOrmModule],
})
export class UserModule {}
