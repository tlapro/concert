export interface IUserTicketAdmin {
    id: string;
    code: string;
    user: {
      id: string;
      name: string;
      email: string;
      password: string;
      birthdate: string;
      phone: string;
      imgUser: string;
      isActive: boolean;
      createdAt: string;
    };
    ticket: {
      id: string;
      type: 'common' | 'vip'; 
      price: number;
      event_date: string; 
      state: boolean;
    };
    purchase: {
      id: string;
      purchase_date: string;
      quantity_common: number;
      quantity_vip: number;
      state: boolean;
    };
    used: boolean;
  }
  