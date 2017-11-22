export interface IProductPrice {
  new: number;
  used: number;
  original: number;
  discount: number;
  saved: number;
  percentage: number;
}

export interface IProductTotal {
  new: number;
  used: number;
}

export interface IProduct {
  _id?: string;
  host: string;
  asin: string;
  brand: string;
  image: string;
  title: string;
  link: string;
  slug: string;
  description: string;
  feature: string;
  manufacturer: string;
  price: IProductPrice;
  total: IProductTotal;
  displayDate?: Date;
}
