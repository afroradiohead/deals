import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { Socket } from 'ngx-socket-io';
import {IProduct} from "../../../shared/interface/product";
import {Socketeer} from "../../../shared/socketer/index";
import {SocketEvent_Init_FromClient, SocketEvent_Init_FromServer} from "../../../shared/socketer/product-page";


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  socketeer: Socketeer;
  product$: Observable<IProduct>;

  constructor(private route: ActivatedRoute, private socket: Socket) {
    this.socketeer = new Socketeer(this.socket);
  }

  ngOnInit() {
    this.product$ = this.socketeer.from(SocketEvent_Init_FromServer)
      .map(response => response.product);



    this.route.params
      .do(a => console.log(a))
      .map(params => params['slug'])
      .do(slug => this.socketeer.send(SocketEvent_Init_FromClient, {slug: slug}))
      .subscribe();
  }
}
