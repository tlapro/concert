/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { LoginUserDto } from './dtos/LoginUser.dto';
import * as bcrypt from 'bcrypt';
import { Role } from './entities/role.entity';
import { Rol } from 'src/common/roles.enum';
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: Repository<User>,
    private readonly rolesRepository: Repository<Role>,
    private readonly dataSource: DataSource,
  ) {}
  async HashPassword(password: string) {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('There was an error hashing password');
    }
    return hashedPassword;
  }
  async signUp(user: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const userDb = await queryRunner.manager.findOne(User, {
        where: { email: user?.email },
      });
      if (!userDb) {
        throw new BadRequestException('Email already in use.');
      }
      if (user.password !== user.confirmPassword) {
        throw new BadRequestException('Passwords does not match');
      }
      const userRole = await this.rolesRepository.findOne({
        where: { name: Rol.User },
      });
      if (!userRole) {
        throw new Error('Role not found');
      }
      const hashedPassword = await this.HashPassword(user.password);

      const newUser = queryRunner.manager.create(User, {
        ...user,
        password: hashedPassword,
        role: userRole,
      });
      await queryRunner.manager.save(newUser);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error.message || 'Inesperated error');
    } finally {
      await queryRunner.release();
    }
  }
  async signIn(credentials: LoginUserDto) {
    const user = await this.usersRepository.findOne({
      where: { email: credentials.email },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      credentials.password,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid email or password.');
    }
  }
}
