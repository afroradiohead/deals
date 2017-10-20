import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Socket} from 'ngx-socket-io';
import {IProduct} from '../../../shared/interface/product';
import {Socketeer} from '../../../shared/socketer/index';
import {SocketCommand} from '../../../shared/socketer/product-page';
import {Subject} from "rxjs/Subject";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  socketeer: Socketeer<SocketCommand>;
  product$: Observable<IProduct>;
  destroyable$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private socket: Socket, private meta: Meta, private title: Title) {
    this.socketeer = new Socketeer(SocketCommand, this.socket);
  }

  ngOnInit() {
    this.product$ = this.socketeer.from('INIT_FROMSERVER')
      .map(response => response.product);

    this.route.params
      .map(params => params['slug'])
      .do(slug => this.socketeer.send('INIT_FROMCLIENT', {slug: slug}))
      .takeUntil(this.destroyable$)
      .subscribe();

    this.product$
      .takeUntil(this.destroyable$)
      .subscribe(product => {
        this.title.setTitle(product.title);
        this.meta.addTag({
          name: 'description',
          content: product.title
        });
      });
  }

  ngOnDestroy() {
    this.destroyable$.next(true);
    this.destroyable$.complete();
  }
}
