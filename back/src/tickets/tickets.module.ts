import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/tickets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [TicketsService],
  controllers: [TicketsController],
})
export class TicketsModule {}
