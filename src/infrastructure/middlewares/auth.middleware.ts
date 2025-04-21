// authentication.middleware.ts
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/domain/user/user.entity';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req?.cookies?.jwt;

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const { id } = jwt.verify(token, secret);

      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      console.log('jvguhyvhyvghgyg');
      req.user = user;
      console.log(req.user);

      next();
    } catch (err) {
      console.error('Auth failed:', err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
