import { ITicket } from "@/interfaces/Tickets";

export const createMercadoPagoPreference = async ({
    userId,
    tickets,
    token,
  }: {
    userId: string;
    tickets: { ticketId: string; quantity: number }[];
    token: string;
  }) => {
    const ticketDetails = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  
    const items = tickets.map((selected) => {
      const ticket = ticketDetails.find((t: ITicket) => t.id === selected.ticketId);
      return {
        id: ticket.id,
        title: ticket.type || "Entrada",
        quantity: selected.quantity,
        unit_price: ticket.price,
      };
    });
  
    // Body creation
    const body = {
      id: userId, // User Id
      title: "Entradas para el evento", // Title
      quantity: 1, // Cantidad total
      unit_price: items.reduce((acc, item) => acc + item.unit_price * item.quantity, 0), // Total Amount
      userId, // USERID
      ticketsToBuy: tickets, // Tickets data
      items, // Tickets Details
    };
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mercado-pago/create-preference`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  
    if (!res.ok) throw new Error("Error al crear preferencia de pago");
  
    const data = await res.json();
    return data;
  };
  