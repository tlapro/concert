import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/tickets/entities/tickets.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async onModuleInit() {
    await this.seedDefaultTickets();
  }

  private async seedDefaultTickets() {
    const defaultTickets = [
      {
        type: 'common',
        price: 100,
        event_date: new Date('2025-08-01'),
        state: true,
      },
      {
        type: 'vip',
        price: 200,
        event_date: new Date('2025-08-01'),
        state: true,
      },
    ];

    for (const ticketData of defaultTickets) {
      const exists = await this.ticketRepository.findOne({
        where: {
          type: ticketData.type,
          event_date: ticketData.event_date,
        },
      });

      if (!exists) {
        const ticket = this.ticketRepository.create(ticketData);
        await this.ticketRepository.save(ticket);
      }
    }

    console.log('[Seeder] - Successfully seeded default tickets.');
  }
}
