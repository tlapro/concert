export interface IUserTicket {
    id: string;
    code: string;
    used: boolean;
    ticket: {
      type: "common" | "vip";
      price: number;
      event_date: string;
    };
  }
  