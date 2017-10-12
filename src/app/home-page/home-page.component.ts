import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

const productList = [
  {
    image: "https://images-na.ssl-images-amazon.com/images/I/51yNMNF3vuL._SX215_.jpg",
    name: "Lego Battles: Ninjago - Nintendo DS",
    link: "https://www.amazon.com/Lego-Battles-Ninjago-Nintendo-DS/dp/B004IYY8PW/ref=sr_1_1?s=videogames&ie=UTF8&qid=1507834556&sr=1-1&keywords=Nintendo+ds+game",
    slug: "lego-battles-ninjado-nintendo-ds",
    price: {
      original: 143.00,
      discount: 280.00
    },
  }
]


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  productList$: Observable<any[]>;

  constructor() { }

  ngOnInit() {
    this.productList$ = Observable.of(productList);
  }
}
