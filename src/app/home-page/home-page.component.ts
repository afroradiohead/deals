import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IProduct} from '../../shared/interface/product';
import {SocketCommand} from './home-page.socket.command';
import {Socketeer} from '../../shared/class/socketeer';
import {GoogleAnalyticsService} from '../shared/service/google-analytics.service';
import {Subject} from 'rxjs/Subject';
import {SocketService} from '../shared/service/socket.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  socketeer: Socketeer<SocketCommand>;
  productList$: Observable<IProduct[]>;
  destroyable$: Subject<boolean> = new Subject<boolean>();

  constructor(socketService: SocketService,
              private gaService: GoogleAnalyticsService,
              private meta: Meta,
              private title: Title
  ) {
    this.socketeer = new Socketeer(SocketCommand, socketService.socket);

    this.productList$ = this.socketeer.from('INIT_FROMSERVER')
      .map(response => response.productList);

    this.socketeer.from('INIT_FROMSERVER')
      .takeUntil(this.destroyable$)
      .subscribe(result => {
        this.title.setTitle(result.title);
        this.meta.updateTag({'description': result.description});
      });

    this.socketeer.send('INIT_FROMCLIENT', {});
  }

  ngOnInit() {
    // this.productList$ = this.socketeer.from('INIT_FROMSERVER')
    //   .map(response => response.productList);

    this.productList$
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

    // this.socketeer.send('INIT_FROMCLIENT', {});

    this.gaService.triggerPageView();
  }

  ngOnDestroy() {
    this.destroyable$.next(true);
    this.destroyable$.complete();
  }
}
