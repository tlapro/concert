import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchares.entity';
import { PurchaseTicket } from './entities/purchares-tickets.entity';
import { PurchaseService } from './purchase.service';
import { Ticket } from 'src/tickets/entities/tickets.entity';
import { UserTicket } from 'src/users/entities/users-tickets.entity';
import { UsersModule } from 'src/users/users.module';
import { PurchaseController } from './purchase.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, PurchaseTicket, UserTicket, Ticket]),
    UsersModule,
  ],
  providers: [PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
