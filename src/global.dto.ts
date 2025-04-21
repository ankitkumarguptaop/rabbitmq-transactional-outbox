import { User } from 'src/domain/user/user.entity';

declare module 'express' {
  export interface Request {
    user: User;
  }
}