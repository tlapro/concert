import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchares.entity';
import { PurchaseTicket } from './entities/purchares-tickets.entity';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly purchasesRepository: Repository<Purchase>,
    private readonly purchasesTicketsRepository: Repository<PurchaseTicket>,
  ) {}
}
