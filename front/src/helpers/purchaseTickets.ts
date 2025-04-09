import axios from "axios";
import { SelectedTicket } from "@/interfaces/ISelectedTicket";

interface PurchaseRequest {
  userId: string;
  tickets: SelectedTicket[];
  token: string;
}

export const purchaseTickets = async ({ userId, tickets, token }: PurchaseRequest) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/purchase`,
      { userId, tickets },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
