import { Injectable } from '@angular/core';

const ga = window['ga'] = window['ga'] || function(){(ga.q = ga.q || []).push(arguments); }; ga.l = +new Date;

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

  constructor() {
    const node = document.createElement('script');
    node.src = 'https://www.google-analytics.com/analytics.js';
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);

    ga('create', 'UA-108296420-2', 'auto');
    ga('require', 'displayfeatures');
    ga('send', 'pageview');
  }

  triggerPageView() {
    ga('send', {
      hitType: 'pageview',
      page: location.pathname
    });
  }

  triggerProductImpression(data: IECImpressionData) {
    this.requireEc();
    ga('ec:addImpression', data);
    ga('send', 'event', 'ec', 'impression');
  }

  triggerProductDetail(data: IECProductData) {
    this.requireEc();
    ga('ec:addProduct', data);
    ga('ec:setAction', 'detail');
    ga('send', 'event', 'ec', 'detail');
  }

  triggerProductPurchase(data: IECProductData, action: IECAction) {
    this.requireEc();
    ga('ec:addProduct', data);
    ga('ec:setAction', 'purchase', action);
    ga('send', 'event', 'ec', 'purchase');
  }

  private requireEc() {
    if (!this.requiredEc) {
      ga('require', 'ec');
      this.requiredEc = true;
    }
  }
}
