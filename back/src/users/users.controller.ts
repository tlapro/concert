import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Rol } from 'src/common/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthenticatedRequest } from 'src/types/express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  // @Roles(Rol.Admin)
  // @UseGuards(AuthGuard, RoleGuard)
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('tickets')
  @UseGuards(AuthGuard)
  getTickets(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.usersService.getTickets(userId);
  }
  @Get(':id')
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }
}
