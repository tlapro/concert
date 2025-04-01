import { Injectable } from '@nestjs/common';
import { Ticket } from './entities/tickets.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsService {
  constructor(private readonly ticketsRepository: Repository<Ticket>) {}
}
