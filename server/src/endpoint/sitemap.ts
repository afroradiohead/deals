import * as express from 'express';

export class SitemapEndpoint {
  constructor(express) {


    express.get('/sitemap', this._index.bind(this));
  }

  private _index(request: express.Request, response: express.Response) {
    response.send('Admin Homepage');
  }
}
