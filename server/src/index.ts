import * as express from 'express';
import {SocketEndpoint} from './socket/index';
import * as winston from 'winston';
import {Scheduler} from './scheduler/index';
import {Endpoint} from './endpoint/index';



/**
 * The server.
 *
 * @class Server
 */
export class AppServer {
  app: express.Application;


  constructor(app: express.Application) {
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
      ]
    });

    app.set('logger', logger);

    const endpoint = new Endpoint(app);
    const socketEndpoint = new SocketEndpoint(app);
    const cron = new Scheduler(app);
  }
}


