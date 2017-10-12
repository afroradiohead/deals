import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

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

const productList: IProduct[] = [
  {
    image: 'https://images-na.ssl-images-amazon.com/images/I/51yNMNF3vuL._SX215_.jpg',
    name: 'Lego Battles: Ninjago - Nintendo DS',
    link: 'https://www.amazon.com/Lego-Battles-Ninjago-Nintendo-DS/dp/B004IYY8PW/ref=sr_1_1?s=videogames&ie=UTF8&qid=1507834556&sr=1-1&keywords=Nintendo+ds+game',
    slug: 'lego-battles-ninjado-nintendo-ds',
    price: {
      original: 143.00,
      discount: 280.00
    },
  }
];


@Injectable()
export class ProductService {

  constructor() { }

  get$(): Observable<IProduct[]> {
    return Observable.of(productList);
  }

  getBySlug$(slug: string): Observable<IProduct> {
    return Observable.of(productList)
      .map(_productList => {
        return _productList.find(product => product.slug === slug.toLowerCase().trim());
      });
  }

}
