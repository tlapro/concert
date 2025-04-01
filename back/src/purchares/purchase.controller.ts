import { Controller } from '@nestjs/common';
import { PurchaseService } from './purchase.service';

@Controller('purchases')
export class PurchaseControler {
  constructor(private readonly purchaseService: PurchaseService) {}
}
