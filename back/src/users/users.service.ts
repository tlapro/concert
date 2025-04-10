/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { LoginUserDto } from './dtos/LoginUser.dto';
import * as bcrypt from 'bcrypt';
import { Role } from './entities/role.entity';
import { Rol } from 'src/common/roles.enum';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTicket } from './entities/users-tickets.entity';
import { UpdateUserPassword } from './dtos/UpdateUserPassword..dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(UserTicket)
    private readonly usersTickets: Repository<UserTicket>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async getUsers() {
    return await this.usersRepository.find({
      relations: ['role'],
    });
  }
  async getUserById(id: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new BadRequestException('User does not exist.');
      }
      return user;
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Can not find user by id.',
      );
    }
  }
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
      if (userDb) {
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
      return { message: 'User created successfully.' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error.message || 'Inesperated error');
    } finally {
      await queryRunner.release();
    }
  }

  async signIn(credentials: LoginUserDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { email: credentials.email },
        relations: ['role'],
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        user.password,
      );

      if (!isPasswordCorrect) {
        throw new BadRequestException('Invalid email or password.');
      }
      const userPayload = {
        sub: user.id,
        id: user.id,
        email: user.email,
        role: user.role.name,
      };

      const token = await this.jwtService.signAsync(userPayload);
      if (!token) {
        throw new InternalServerErrorException('Token generation failed.');
      }

      const {
        password: ignoredPassword,
        isActive: ignoredisActive,
        ...userWithoutPassword
      } = user;

      return { message: 'Login successful!', user: userWithoutPassword, token };
    } catch (error) {
      throw new BadRequestException(error.message || 'Inesperated error');
    }
  }

  async getTickets(userId: string) {
    return this.usersTickets.find({
      where: { user: { id: userId } },
      relations: ['ticket', 'purchase'],
    });
  }

  async getAllTickets() {
    return this.usersTickets.find({
      relations: ['ticket', 'purchase', 'user'],
    });
  }

  comparePassword(password1: string, password2: string): boolean {
    return password1 === password2;
  }

  async changePassword(
    userUpdatePassword: UpdateUserPassword,
    id: string,
  ): Promise<{ message: string }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const user = await queryRunner.manager.findOne(User, { where: { id } });

      if (!user) {
        throw new BadRequestException('No se encontró el usuario.');
      }

      const isPasswordCorrect = await bcrypt.compare(
        userUpdatePassword.oldPassword,
        user.password,
      );
      if (!isPasswordCorrect) {
        throw new BadRequestException('La contraseña actual es incorrecta.');
      }
      const isOldPassword = await bcrypt.compare(
        userUpdatePassword.newPassword,
        user.password,
      );
      if (isOldPassword) {
        throw new BadRequestException(
          'La nueva contraseña no puede ser igual a la anterior.',
        );
      }
      const isPasswordValid = this.comparePassword(
        userUpdatePassword.newPassword,
        userUpdatePassword.confirmPassword,
      );
      if (
        userUpdatePassword.newPassword !== userUpdatePassword.confirmPassword
      ) {
        throw new BadRequestException(
          'La nueva contraseña y su confirmación no coinciden',
        );
      }
      const newPasswordHashed = await bcrypt.hash(
        userUpdatePassword.newPassword,
        10,
      );
      await queryRunner.manager.update(User, id, {
        password: newPasswordHashed,
      });

      await queryRunner.commitTransaction();
      return { message: 'Contraseña modificada con éxito.' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(
        error.message || 'Ocurrió un error al cambiar la contraseña',
      );
    } finally {
      await queryRunner.release();
    }
  }
}
