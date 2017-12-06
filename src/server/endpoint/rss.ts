import * as express from 'express';
import * as RSS from 'rss';
import {HostDatabase} from '../iridium/index';
import * as Moment from 'moment';
import {HOST_CONFIG} from '../host-config';

export class RssEndpoint {
  constructor(express) {
    express.get('/rss', this._index.bind(this));
  }

  private _index(request: express.Request, response: express.Response) {
    const config = HOST_CONFIG[request.headers.host];
    const db = HostDatabase.Create();
    const rss = new RSS({
      title: config.title,
      description: config.description,
      feed_url: `${request.protocol}://${request.headers.host}/rss`,
      site_url: `${request.protocol}://${request.headers.host}`,
      language: 'en',
      ttl: 60,
    });

    db.connect()
      .then(() => db.Products.find({host: request.headers.host}).toArray())
      .then((productList) => {
        productList.forEach(product => { // @todo find where displayDate != null
          rss.item({
            title:  product.title,
            description: product.description,
            url: `${request.protocol}://${request.headers.host}/product/${product.slug}`,
            date: Moment(product.displayDate).format(),
          });
        });
        response.set('Content-Type', 'application/rss+xml');
        response.send(rss.xml());
      })
      .then(() => db.close());
  }
}
