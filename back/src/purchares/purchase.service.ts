import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchares.entity';
import { PurchaseTicket } from './entities/purchares-tickets.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchasesRepository: Repository<Purchase>,
    @InjectRepository(PurchaseTicket)
    private readonly purchasesTicketsRepository: Repository<PurchaseTicket>,
  ) {}
}
