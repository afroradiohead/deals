import * as Handlebars from 'handlebars';
import {IProduct} from '../../../shared/interface/product';
const fs = require('fs');
const path = require('path');
import * as _ from 'lodash';
import {HOST_CONFIG} from '../../host-config';
const MailGun = require('mailgun-es6');

const mailGun = new MailGun({
  privateApi: 'key-8c92e20dc97f78f2ebfa540ff8f31154',
  publicApi: 'pubkey-38cb1df01a99730425f758d5114d56a0',
  domainName: 'sandbox77cd65e7250d419daacb6d169b52cc86.mailgun.org'
});


interface IConfig {
  emailTo: string;
  host: string;
  productList: IProduct[];
}

export class SubscriptionEmail {
  constructor(private config: IConfig) {
    // this.unsubscribeUrl = 'host/unsubscribe';
  }

  generateHtml() {
    const template = fs.readFileSync(path.join(__dirname, './subscription-email-template.hbs'), 'utf8');
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({
      productListList: _.chunk(this.config.productList, 3),
      host: this.config.host
    });
  }

  p$sendEmail() {
    return mailGun.sendEmail({
      // to: this.config.emailTo,
      to: 'tytuf@cars2.club',
      from: HOST_CONFIG[this.config.host].newsletterEmailAddress,
      subject: 'Here are the products you subscribed to',
      html: this.generateHtml()
    })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.log(err));
  }
}
