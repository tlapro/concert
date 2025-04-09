import { Controller, Post, UseGuards } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('purchases')
export class PurchaseControler {
  constructor(private readonly purchaseService: PurchaseService) {}
  @Post()
  @UseGuards(AuthGuard)
  createPurchase() {
  }
}
