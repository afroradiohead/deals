import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {IProduct} from '../../../shared/interface/product';
import {SocketCommand} from '../../../shared/socketer/home-page';
import {Socketeer} from '../../../shared/socketer/index';
import {GoogleAnalyticsService} from "../shared/service/google-analytics.service";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  socketeer: Socketeer<SocketCommand>;
  productList$: Observable<IProduct[]>;
  destroyable$: Subject<boolean> = new Subject<boolean>();

  constructor(socket: Socket, private gaService: GoogleAnalyticsService) {
    this.socketeer = new Socketeer(SocketCommand, socket);

    this.productList$ = this.socketeer.from('INIT_FROMSERVER')
      .map(response => response.productList);

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
