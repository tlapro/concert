import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Role } from 'src/users/entities/role.entity';
import { UserTicket } from 'src/users/entities/users-tickets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserTicket])],
  providers: [UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
