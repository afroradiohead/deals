import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {IProduct} from '../../shared/interface/product';
import {Socketeer} from '../../shared/class/socketeer';
import {Subject} from 'rxjs/Subject';
import {SocketCommand} from './buy-page.socket.command';
import {GoogleAnalyticsService} from '../shared/service/google-analytics.service';
import * as _ from 'lodash';
import {SocketService} from "../shared/service/socket.service";

@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.scss']
})
export class BuyPageComponent implements OnInit, OnDestroy {
  product$: Observable<IProduct>;
  socketeer: Socketeer<SocketCommand>;
  destroyable$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, socketService: SocketService, private gaService: GoogleAnalyticsService) {
    this.socketeer = new Socketeer(SocketCommand, socketService.socket);

    this.product$ = this.socketeer.from('INIT_FROMSERVER')
      .map(response => response.product);

    Observable.from(this.route.params)
      .takeUntil(this.destroyable$)
      .map(params => params['id'])
      .subscribe(id => this.socketeer.send('INIT_FROMCLIENT', {id: id}));
  }

  ngOnInit() {
    this.product$
      .takeUntil(this.destroyable$)
      .subscribe(product => {
        this.gaService.triggerProductPurchase({
          id: product._id,
          name: product.title,
          price: product.price.discount
        }, {
          id: _.uniqueId()
        });
        setTimeout(() => {
          window.location.href = product.link;
        }, 500);
      });

    this.gaService.triggerPageView();
  }

  ngOnDestroy() {
    this.destroyable$.next(true);
    this.destroyable$.complete();
  }
}
