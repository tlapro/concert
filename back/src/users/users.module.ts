import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { User } from './entities/users.entity';
import { RolesSeeder } from 'src/common/roles.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UsersService, RolesSeeder],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
