import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Rol } from 'src/common/roles.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthenticatedRequest } from 'src/types/express';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  getAllPurchases() {
    return this.purchaseService.getAllPurchases();
  }

  @Get(':id')
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  getPurchaseById(@Param('id', ParseUUIDPipe) id: string) {
    return this.purchaseService.getPurchaseById(id);
  }

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
