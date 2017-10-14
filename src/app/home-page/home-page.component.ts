import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { Socket } from 'ngx-socket-io';
import {IProduct} from '../../../shared/interface/product';
import {SocketEvent_Init_FromClient, SocketEvent_Init_FromServer} from '../../../shared/socketer/home-page';
import {Socketeer} from '../../../shared/socketer/index';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  productList$: Observable<IProduct[]>;
  private socketeer: Socketeer;

  constructor(socket: Socket) {
    this.socketeer = new Socketeer(socket);
  }

  ngOnInit() {
    this.productList$ = this.socketeer.from(SocketEvent_Init_FromServer)
      .map(response => response.productList);


    this.socketeer.send(SocketEvent_Init_FromClient, {});
  }
}
