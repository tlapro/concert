import { Body, Controller, Post } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mpService: MercadoPagoService) {}

  @Post('create-preference')
  async createPreference(
    @Body()
    body: {
      id: string;
      title: string;
      quantity: number;
      unit_price: number;
    },
  ) {
    const preference = await this.mpService.createPreference(body);
    return { id: preference.id, init_point: preference.init_point };
  }
}
