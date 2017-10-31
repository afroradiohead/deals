import * as express from 'express';
import {RssEndpoint} from './rss';

const endpointClassList = [
  RssEndpoint
];

export class Endpoint {
  constructor(app) {
    const endpointExpress = express();

    app.use('/', endpointExpress);
    endpointClassList.forEach(endpointClass => new endpointClass(endpointExpress));
  }
}
