import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {IProduct} from '../../../shared/interface/product';
import {Socketeer} from '../../../shared/socketer/index';
import {Subject} from 'rxjs/Subject';
import {SocketCommand} from '../../../shared/socketer/buy-page';

@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.scss']
})
export class BuyPageComponent implements OnInit {
  product$: Observable<IProduct>;
  private socketeer: Socketeer<SocketCommand>;
  destroyable$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private socket: Socket) {
    this.socketeer = new Socketeer(SocketCommand, this.socket);
  }

  ngOnInit() {
    this.product$ = this.socketeer.from('INIT_FROMSERVER')
      .map(response => response.product);

    this.product$
      .takeUntil(this.destroyable$)
      .subscribe(product => {
        window.location.href = product.link;
      });

    this.route.params
      .map(params => params['id'])
      .takeUntil(this.destroyable$)
      .subscribe(id => this.socketeer.send('INIT_FROMCLIENT', {id: id}));
  }

}
