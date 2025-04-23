import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/user/user.entity';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserController } from './create-user.controller';
import { CreateUserHandler } from './create-user.handler';
import { CreateUserCommand } from './create-user.command';


@Module({
  imports: [TypeOrmModule.forFeature([User]) , CqrsModule],
  controllers: [CreateUserController],
  providers: [
    UserRepository,
    CreateUserHandler,
  ],
  exports: [TypeOrmModule],
})

export class CreateUserModule {}
