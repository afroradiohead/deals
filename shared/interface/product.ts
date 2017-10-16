export interface IProduct {
  _id?: string;
  image: string;
  name: string;
  link: string;
  slug: string;
  price: {
    original: number;
    discount?: number;
  };
}
