import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Socket} from 'ngx-socket-io';
import {IProduct} from '../../../shared/interface/product';
import {Socketeer} from '../../../shared/socketer/index';
import {SocketCommand} from '../../../shared/socketer/product-page';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  socketeer4: Socketeer<SocketCommand>;
  product$: Observable<IProduct>;

  constructor(private route: ActivatedRoute, private socket: Socket) {
    this.socketeer4 = new Socketeer(SocketCommand, this.socket);
  }

  ngOnInit() {
    this.product$ = this.socketeer4.from('INIT_FROMSERVER')
      .map(response => response.product);

    this.route.params
      .do(a => console.log(a))
      .map(params => params['slug'])
      .do(slug => this.socketeer4.send('INIT_FROMCLIENT', {slug: slug}))
      .subscribe();
  }
}
