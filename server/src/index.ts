import * as express from "express";
import {SocketEndpoint} from "./socket/index";
import * as winston from "winston";

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


