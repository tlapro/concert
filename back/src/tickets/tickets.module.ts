import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/tickets.entity';
import { TicketsSeeder } from 'src/common/tickets.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [TicketsService, TicketsSeeder],
  controllers: [TicketsController],
})
export class TicketsModule {}
