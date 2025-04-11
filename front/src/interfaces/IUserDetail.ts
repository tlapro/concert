export interface IUserPurchase {
  id: string;
  purchase_date: string;
  quantity_common: number;
  quantity_vip: number;
  state: boolean;
}

export interface IUserDetail {
  id: string;
  name: string;
  email: string;
  password?: string;
  birthdate: string;
  phone: string;
  imgUser?: string;
  isActive: boolean;
  createdAt: string;
  purchases: IUserPurchase[];
}
