import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

const productList = [
  {
    image: "https://images-na.ssl-images-amazon.com/images/I/51yNMNF3vuL._SX215_.jpg",
    name: "Lego Battles: Ninjago - Nintendo DS"
  }
]

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    this.productList$ = Observable.of(productList);
  }

}
