import * as express from 'express';
import {SocketEndpoint} from './socket/index';
import {Scheduler} from './scheduler/index';
import {Endpoint} from './endpoint/index';
import {logger} from "./logger";



/**
 * The server.
 *
 * @class Server
 */
export class AppServer {
  app: express.Application;


  constructor(app: express.Application) {

    app.set('logger', logger);

    const endpoint = new Endpoint(app);
    const socketEndpoint = new SocketEndpoint(app);
    const cron = new Scheduler(app);
  }
}


