import { Controller, Get, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Rol } from 'src/common/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}
  @Get()
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  getTickets() {
    return this.ticketsService.getTickets();
  }
}
