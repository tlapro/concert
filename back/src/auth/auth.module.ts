import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
