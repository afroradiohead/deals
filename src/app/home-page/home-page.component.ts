import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { Socket } from 'ngx-socket-io';
import {IProduct} from "../../../shared/interface/product";
import {InitSocketeer} from "../../../shared/socketer/home-page";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  productList$: Observable<IProduct[]>;
  private initSocketeer: InitSocketeer;

  constructor(socket: Socket) {
    this.initSocketeer = new InitSocketeer(socket);
  }

  ngOnInit() {
    this.productList$ = this.initSocketeer.fromResponse()
      .map(response => response['productList']);

    this.initSocketeer.sendRequest({});
  }
}
