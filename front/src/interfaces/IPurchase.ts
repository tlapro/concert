export interface PurchaseTicket {
    id: string;
    quantity: number;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    birthdate: string;
    phone: string;
    imgUser: string;
    isActive: boolean;
    createdAt: string;
  }
  
  export interface IPurchase {
    id: string;
    user: User;
    ticket: null; 
    purchaseTickets: PurchaseTicket[];
    purchase_date: string;
    quantity_common: number;
    quantity_vip: number;
    state: boolean;
  }
  