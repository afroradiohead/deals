import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Scheduler} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {IProduct} from '../../shared/interface/product';
import {Socketeer} from '../../shared/class/socketeer';
import {SocketCommand} from './product-page.socket';
import {Subject} from 'rxjs/Subject';
import {Meta, Title} from '@angular/platform-browser';
import {GoogleAnalyticsService} from '../shared/service/google-analytics.service';
import {SocketService} from '../shared/service/socket.service';
import * as moment from 'moment';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  socketeer: Socketeer<SocketCommand>;
  randomProductList$: Observable<IProduct[]>;
  product$: Observable<IProduct>;
  destroyable$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    socketService: SocketService,
    private meta: Meta,
    private title: Title,
    private gaService: GoogleAnalyticsService
  ) {
    this.socketeer = new Socketeer(SocketCommand, socketService.socket);
    this.product$ = this.socketeer.from('INIT_FROMSERVER')
      .map(response => response.product);
    this.randomProductList$ = this.socketeer.from('INIT_FROMSERVER')
      .map(response => response.randomProductList);

    Observable.from(this.route.params)
      .takeUntil(this.destroyable$)
      .map(params => params['slug'])
      .subscribe(slug => this.socketeer.send('INIT_FROMCLIENT', {slug: slug}));
  }

  ngOnInit() {
    this.product$
      .takeUntil(this.destroyable$)
      .subscribe(product => {
        this.title.setTitle(product.title);
        this.meta.updateTag({'description': product.description});

        this.gaService.triggerProductDetail({
          id: product._id,
          name: product.title,
          price: product.price.discount
        });
      });
    this.randomProductList$
      .takeUntil(this.destroyable$)
      .subscribe(productList => {
        productList.forEach(product => {
          this.gaService.triggerProductImpression({
            id: product._id,
            name: product.title,
            price: product.price.discount
          });
        });
      });

    this.gaService.triggerPageView();
  }

  ngOnDestroy() {
    this.destroyable$.next(true);
    this.destroyable$.complete();
  }
}

