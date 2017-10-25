import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {IProduct} from '../../../shared/interface/product';
import {SocketCommand} from '../../../shared/socketer/home-page';
import {Socketeer} from '../../../shared/socketer/index';
import {GoogleAnalyticsService} from "../shared/service/google-analytics.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  socketeer: Socketeer<SocketCommand>;
  productList$: Observable<IProduct[]>;

  constructor(socket: Socket, private gaService: GoogleAnalyticsService) {
    this.socketeer = new Socketeer(SocketCommand, socket);
  }

  ngOnInit() {
    this.productList$ = this.socketeer.from('INIT_FROMSERVER')
      .map(response => response.productList);

    this.socketeer.send('INIT_FROMCLIENT', {});
  }
}
