import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/user/user.entity';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';

import { CqrsModule } from '@nestjs/cqrs';
import { SignInUserController } from './signin-user.controller';
import { SignInUserHandler } from './signin-user.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [SignInUserController],
  providers: [UserRepository, SignInUserHandler],
  exports: [TypeOrmModule],
})
export class SignInUserModule {}
