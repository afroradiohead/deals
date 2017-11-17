import { Injectable } from '@angular/core';
import {SocketService} from "./socket.service";
import {Socketeer} from "./google-analytics.socketeer";

const ga = window['ga'] = window['ga'] || function(){(ga.q = ga.q || []).push(arguments); }; ga.l = +new Date;

window['dataLayer'] = window['dataLayer'] || [];
function gtag(...data) {window['dataLayer'].push(data); }



/**
 *
 click	A click on a product or product link for one or more products.
 detail	A view of product details.
 add	Adding one or more products to a shopping cart.
 remove	Remove one or more products from a shopping cart.
 checkout	Initiating the checkout process for one or more products.
 checkout_option	Sending the option value for a given checkout step.
 purchase	The sale of one or more products.
 refund	The refund of one or more products.
 promo_click	A click on an internal promotion.


 ga('send', 'event', 'Ecommerce', 'Refund', {'nonInteraction': 1});
 */
interface IECImpressionData {
  id: string;
  name: string;
  list?: string;
  brand?: string;
  category?: string;
  variant?: string;
  position?: number;
  price?: number;
}
interface IECProductData {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  variant?: string;
  price?: number;
  quantity?: number;
  coupon?: string;
  position?: number;
}
interface IECAction {
  id: string;
  affiliation?: string;
  revenue?: number;
  tax?: number;
  shipping?: number;
  coupon?: string;
  list?: string;
  step?: number;
  option?: string;
}


@Injectable()
export class GoogleAnalyticsService {
  private requiredEc = false;
  private socketeer: Socketeer;

  constructor(socketService: SocketService) {
    this.socketeer = new Socketeer(socketService.socket);


    this.socketeer.fromServer('INIT')
      .first()
      .subscribe(response => {
        const node = document.createElement('script');
        node.src = `https://www.google-analytics.com/analytics.js?id=${response.gaId}`;
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
        gtag('js', new Date());
        gtag('config', response.gaId);
      });

    this.socketeer.toServer('INIT', {});
  }

  triggerPageView() {
    gtag('send', {
      hitType: 'pageview',
      page: location.pathname
    });
  }

  triggerProductImpression(data: IECImpressionData) {
    this.requireEc();
    gtag('ec:addImpression', data);
    gtag('send', 'event', 'ec', 'impression');
  }

  triggerProductDetail(data: IECProductData) {
    this.requireEc();
    gtag('ec:addProduct', data);
    gtag('ec:setAction', 'detail');
    gtag('send', 'event', 'ec', 'detail');
  }

  triggerProductPurchase(data: IECProductData, action: IECAction) {
    this.requireEc();
    gtag('ec:addProduct', data);
    gtag('ec:setAction', 'purchase', action);
    gtag('send', 'event', 'ec', 'purchase');
  }

  private requireEc() {
    if (!this.requiredEc) {
      gtag('require', 'ec');
      this.requiredEc = true;
    }
  }
}
