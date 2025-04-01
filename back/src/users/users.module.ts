import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { User } from './entities/users.entity';
import { SeedsService } from 'src/common/seed';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UsersService, SeedsService],
  controllers: [UsersController],
})
export class UsersModule {}
