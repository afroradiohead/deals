import {Component, Input, OnInit} from '@angular/core';
import {calculatePricePercentage, IProduct} from '../../../../shared/interface/product';
import {GoogleAnalyticsService} from '../../service/google-analytics.service';
import {SocketService} from '../../service/socket.service';
import {Socketeer} from '../../../../shared/class/socketeer';
import {SocketCommand} from './product-card.socket.command';
import {ProductSubscriptionModalService} from '../product-subscription-modal/product-subscription-modal.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  socketeer: Socketeer<SocketCommand>;
  @Input() product: IProduct;
  get percentage(){
    return calculatePricePercentage(this.product);
  }

  constructor(socketService: SocketService,
              private gaService: GoogleAnalyticsService,
              private productSubscriptionModal: ProductSubscriptionModalService) {
    this.socketeer = new Socketeer(SocketCommand, socketService.socket);
  }

  ngOnInit() {

  }

  onClick_subscribeButton(e) {
    this.productSubscriptionModal.open$.next({
      product: this.product
    });
  }
}
