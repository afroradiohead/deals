import * as express from "express";
import {SocketEndpoint} from "./socket/index";
import * as winston from "winston";
import * as fs from "fs";
const env = process.env.NODE_ENV || 'development';
const logDir = 'log';
// // Create the log directory if it does not exist
// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir);
// }
// const tsFormat = () => (new Date()).toLocaleTimeString();
// const logger = new (winston.Logger)({
//   transports: [
//     // colorize the output to the console
//     new (winston.transports.Console)({
//       timestamp: tsFormat,
//       colorize: true,
//       level: 'info'
//     }),
//     new (winston.transports.File)({
//       filename: `${logDir}/results.log`,
//       timestamp: tsFormat,
//       level: env === 'development' ? 'debug' : 'info'
//     })
//   ]
// });
// logger.info('Hello world');
// logger.warn('Warning message');


/**
 * The server.
 *
 * @class Server
 */
export class AppServer {
  app: express.Application;


  constructor(app: express.Application) {
    const socketEndpoint = new SocketEndpoint(app);
  }
}


