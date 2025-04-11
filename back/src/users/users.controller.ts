import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Rol } from 'src/common/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthenticatedRequest } from 'src/types/express';
import { UpdateUserPassword } from './dtos/UpdateUserPassword..dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('tickets')
  @UseGuards(AuthGuard)
  getTickets(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.usersService.getTickets(userId);
  }

  @Get('alltickets')
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  getAllTickets() {
    return this.usersService.getAllTickets();
  }

  @Get(':id')
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @Put('change-password')
  @UseGuards(AuthGuard)
  changePassword(
    @Req() req: AuthenticatedRequest,
    @Body() userUpdatePassword: UpdateUserPassword,
  ) {
    const userId = req.user.id;
    return this.usersService.changePassword(userUpdatePassword, userId);
  }
}
