export interface IProductPrice {
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
  asin: string;
  image: string;
  title: string;
  link: string;
  slug: string;
  description: string;
  manufacturer: string;
  price: IProductPrice;
  total: IProductTotal;
}
