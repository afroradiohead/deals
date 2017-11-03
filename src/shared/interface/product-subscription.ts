
export interface IProductSubscription {
  _id?: string;
  productId: string;
  email: string;
  host: string;
  createdAt?: Date;
  updatedAt?: Date;
  active: boolean;
}
