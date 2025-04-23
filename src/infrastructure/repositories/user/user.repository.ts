import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/domain/user/user.entity';
import { CreateUserDto } from 'src/features/user/create-user/create-user.dto';
const jwt = require('jsonwebtoken');
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource ,   private configService: ConfigService,) {
    super(User, dataSource.createEntityManager()); // create dataSource entityManager for (which help to db operations for particular entity )
  }
  async createUser(payload: CreateUserDto): Promise<any> {
    return await this.save(payload);
  }
  async findUser(id: number): Promise<any> {
    return await this.findOne({
      where: {
        id: id,
      },
    });
  }
  async updateUser(id: number, payload: any): Promise<any> {
    await this.update(id, {
      ...(payload.name && { name: payload.name }),
      ...(payload.password && { password: payload.password }),
    });
    return await this.findOne({
      where: {
        id: id,
      },
    });
  }
  generateToken = (id: number) => {
    return jwt.sign({ id }, this.configService.get<number>('JWT_SECRET')||"nbvtyv", {
      expiresIn: '3d',
    });
  };

  
}
