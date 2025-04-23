import {
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class SignInUserDto {
  
    @IsNotEmpty()  
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