import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {IProduct, ProductService} from '../shared/service/product.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  productList$: Observable<IProduct[]>;

  constructor(private socket: Socket) { }

  ngOnInit() {
    this.productList$ = this.socket.fromEvent('home/init.response')
      .map(response => response['productList']);

    this.socket.emit('home/init', {});
  }
}
