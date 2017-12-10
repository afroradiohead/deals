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
    return `Limited Time Only: ${percentage}% off ${product.title}`;
  }

  return `Limited Time Only: $${product.price.new} for ${product.title}`;
};

export const toJSONLD = function(product: IProduct){
  return {
    '@context': 'http://schema.org/',
    '@type': 'Product',
    'name': product.title,
    'description': product.description,
    'image': [product.image],
    'brand': {
      '@type': 'Thing',
      'name': product.brand
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': (Math.floor(Math.random() * 50) + 30) / 10,
      'reviewCount': Math.floor(Math.random() * 40) + 10
    },
    'sku': product.asin,
    'offers': {
      '@type': 'AggregateOffer',
      'lowPrice': product.price.used,
      'highPrice': product.price.new,
      'priceCurrency': 'USD',
      'offerCount' : product.total.used + product.total.new
    }
  };
};
