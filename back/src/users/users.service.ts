import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { LoginUserDto } from './dtos/LoginUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: Repository<User>) {}

  signUp(user: CreateUserDto) {
    return 'Endpoint para crear usuario';
  }
  signIn(credentials: LoginUserDto) {
    return 'Endpoint para logear usuario';
  }
}
