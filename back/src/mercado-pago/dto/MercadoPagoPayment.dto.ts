export interface MercadoPagoPayment {
  status: string;
  metadata: {
    userId: string;
    tickets: { ticketId: string; quantity: number }[];
  };
}
