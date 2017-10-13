import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { Socket } from 'ngx-socket-io';
import {IProduct} from "../../../shared/interface/product";


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product$: Observable<IProduct>;

  constructor(private route: ActivatedRoute, private socket: Socket) {
    // this.socketInit = new SocketInit(socket);
    // this.socketeer = new FromClientSocketeer(this.socket);
    // this.socketeer = new Socketeer(this.socket);
    //
  }

  ngOnInit() {
    // this.socket.fromEvent<T>()
    // socketeer.run<
//initSocket.fromResponse()
    this.product$ = Observable.from(this.socket.fromEvent("product-page/init.response"))
      .do(a => console.log(a))
      .map(response => response['product']);


    //initSocket.sendRequest();

    this.route.params
      .do(a => console.log(a))
      .map(params => params['slug'])
      .do(slug => this.socket.emit("product-page/init", {slug: slug}))
      .subscribe();
  }
}
