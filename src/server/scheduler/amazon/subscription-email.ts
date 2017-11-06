import * as Handlebars from 'handlebars';
import {IProduct} from '../../../shared/interface/product';
const fs = require('fs');
const path = require('path');
import * as _ from 'lodash';

interface IConfig {
  productList: IProduct[];
}


export class SubscriptionEmail {
  constructor(private config: IConfig) {
    // this.unsubscribeUrl = 'host/unsubscribe';
  }

  generateSubject() {
    return 'Here are the products you subscribed to';
  }

  generateHtml() {
    const template = fs.readFileSync(path.join(__dirname, './subscription-email-template.hbs'), 'utf8');
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({
      productListList: _.chunk(this.config.productList, 3)
    });
  }
}
