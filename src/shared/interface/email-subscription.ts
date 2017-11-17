export interface IEmailSubscription {
  _id?: string;
  email: string;
  host: string;
  createdAt?: Date;
  updatedAt?: Date;
  active: boolean;
}
