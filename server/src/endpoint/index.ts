import * as express from 'express';
import {SitemapEndpoint} from './sitemap';

const endpointClassList = [
  SitemapEndpoint
];

export class Endpoint {
  constructor(app) {
    const endpointExpress = express();

    app.use('/', endpointExpress);
    endpointClassList.forEach(endpointClass => new endpointClass(endpointExpress));
  }
}
