import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthenticatedRequest } from 'src/types/express';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createPurchase(
    @Req() req: AuthenticatedRequest,
    @Body() body: { tickets: { ticketId: string; quantity: number }[] },
  ) {
    const userId = req.user.id;
    return this.purchaseService.createPurchase(userId, body.tickets);
  }
}
