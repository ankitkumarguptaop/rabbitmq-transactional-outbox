import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class SignInUserDto {
  
    @IsNotEmpty()  
    @IsString()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()  
    @MinLength(6, {
      message: 'Password is too short',
    })
    @MaxLength(20, {
      message: 'Password is too long',
    })
    password: string;
  }