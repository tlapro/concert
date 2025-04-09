import { Controller, Get, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}
  @Get()
  @UseGuards(AuthGuard)
  getTickets() {
    return this.ticketsService.getTickets();
  }
}
