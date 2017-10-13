export interface IProduct {
  image: string;
  name: string;
  link: string;
  slug: string;
  price: {
    original: number;
    discount?: number;
  };
}
