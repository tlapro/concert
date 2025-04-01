import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchares.entity';
import { PurchaseTicket } from './entities/purchares-tickets.entity';
import { PurchaseService } from './purchase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, PurchaseTicket])],
  providers: [PurchaseService],
  controllers: [],
})
export class PurchaseModule {}
