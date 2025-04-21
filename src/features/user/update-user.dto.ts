import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  name: string;
  @MinLength(6, {
    message: 'Password is too short',
  })
  @MaxLength(20, {
    message: 'Password is too long',
  })
  password: string;
}
