/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { mpClient } from '../config/mercadopago';
import { Preference } from 'mercadopago/dist/clients/preference';

@Injectable()
export class MercadoPagoService {
  private preferenceClient = new Preference(mpClient);

  async createPreference(data: {
    id: string;
    title: string;
    quantity: number;
    unit_price: number;
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
        success: `${process.env.API_URL}/success`,
        failure: `${process.env.API_URL}/failure`,
        pending: `${process.env.API_URL}/pending`,
      },
      auto_return: 'approved',
    };

    const result = await this.preferenceClient.create({ body: preference });
    return {
      id: result.id,
      init_point: result.init_point,
    };
  }
}
