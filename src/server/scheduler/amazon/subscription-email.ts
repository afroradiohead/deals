import * as Handlebars from 'handlebars';
import {IProduct} from '../../../shared/interface/product';
const fs = require('fs');
const path = require('path');


interface IConfig {
  productList: IProduct[];
}

export class SubscriptionEmail {
  constructor(private config: IConfig) {

  }

  generateSubject() {
    return 'Here are the products you subscribed to';
  }

  generateHtml() {
    const template = fs.readFileSync(path.join(__dirname, './subscription-email-template.hbs'), 'utf8');
    const compiledTemplate = Handlebars.compile(template);


    // this.config.productList
    const data = {
      productListList: [
        [{
          name: 'one',
        }, {
          name: 'two',
        }, {
          name: 'threre',
        }],
        [{
          name: '44444',
        }, null, null]
      ]
    };
    return compiledTemplate(data);
  }
}
