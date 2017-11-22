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

export const calculatePricePercentage = function(product: IProduct): number{
  const newPrice = product.price.used || product.price.new || product.price.discount;

  return 100 - +(newPrice / product.price.original * 100).toFixed();
};

export const generatePageTitle = function(product: IProduct): string{
  const percentage = calculatePricePercentage(product);
  if (percentage > 0) {
    return `${percentage}% off $${product.price.original} - ${product.title}`;
  }

  return `$${product.price.original} - ${product.title}`;
};
