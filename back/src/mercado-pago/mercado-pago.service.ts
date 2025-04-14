import { Injectable } from '@nestjs/common';
import { mpClient } from '../config/mercadopago';
import { Preference } from 'mercadopago/dist/clients/preference';
import { Payment } from 'mercadopago/dist/clients/payment';

@Injectable()
export class MercadoPagoService {
  private preferenceClient = new Preference(mpClient);
  private paymentClient = new Payment(mpClient);
  async createPreference(data: {
    id: string;
    title: string;
    quantity: number;
    unit_price: number;
    userId: string;
    ticketsToBuy: { ticketId: string; quantity: number }[];
  }) {
    const preference = {
      items: [
        {
          id: String(data.id),
          title: data.title,
          quantity: data.quantity,
          unit_price: data.unit_price,
          currency_id: 'ARS',
        },
      ],
      back_urls: {
        success: `${process.env.FRONTEND_URL}/payment/success`,
        failure: `${process.env.FRONTEND_URL}/payment/failure`,
        pending: `${process.env.FRONTEND_URL}/payment/pending`,
      },
      auto_return: 'approved',
      notification_url: `${process.env.API_URL}/mercado-pago/webhook`,
      metadata: {
        userId: data.userId,
        tickets: data.ticketsToBuy,
      },
    };

    const result = await this.preferenceClient.create({ body: preference });

    return {
      id: result.id,
      init_point: result.init_point,
    };
  }

  async getPaymentById(id: string): Promise<any> {
    const result = await this.paymentClient.get({ id });
    console.log('Metadatos del pago:', result.metadata);

    if ('body' in result) {
      return (result as any).body;
    }

    return result;
  }
}
