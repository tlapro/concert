/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MercadoPagoConfig } from 'mercadopago';

export const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || '',
});
