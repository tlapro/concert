/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Post } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { PurchaseService } from 'src/purchares/purchase.service';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(
    private readonly mpService: MercadoPagoService,
    private readonly purchaseService: PurchaseService,
  ) {}

  @Post('create-preference')
  async createPreference(
    @Body()
    body: {
      id: string;
      title: string;
      quantity: number;
      unit_price: number;
      userId: string;
      ticketsToBuy: { ticketId: string; quantity: number }[];
    },
  ) {
    const preference = await this.mpService.createPreference(body);
    return { id: preference.id, init_point: preference.init_point };
  }

  @Post('webhook')
  async mercadoPagoWebhook(@Body() body: any) {
    try {
      // console.log('✅ Webhook recibido:', body);

      if (body?.type === 'payment' && body?.data?.id) {
        const paymentId = body.data.id;

        const payment = await this.mpService.getPaymentById(paymentId);
        // console.log('Metadatos del pago:', payment?.metadata);

        if (payment?.status === 'approved') {
          const metadata = payment?.metadata;

          const userId = metadata.userId ?? metadata.user_id;
          const ticketsToBuy = (metadata.tickets ?? []).map((t) => ({
            ticketId: t.ticketId ?? t.ticket_id,
            quantity: t.quantity,
          }));

          // console.log('UserId Recibido de la Metadata', userId);
          // console.log('tickets de la metadata', ticketsToBuy);

          if (userId && ticketsToBuy.length > 0) {
            // const ticketDetails = ticketsToBuy[0];
            // console.log('Detalles del ticket:', ticketDetails);

            const purchaseResponse = await this.purchaseService.createPurchase(
              userId,
              ticketsToBuy,
            );

            console.log('Compra creada con éxito:', purchaseResponse);
          } else {
            console.error(
              'No se encontraron tickets o userId en los metadatos del pago',
            );
          }
        }
      }
    } catch (error) {
      console.error('❌ Error en webhook de MercadoPago:', error);
    }

    return { received: true };
  }
}
