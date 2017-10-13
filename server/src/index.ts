import * as express from "express";
import {SocketEndpoint} from "./socket/index";
// import {SocketEndpoint} from "./socket-endpoint/index";

/**
 * The server.
 *
 * @class Server
 */
export class AppServer {
  app: express.Application;


  constructor(app: express.Application) {
    // app.set()

    const socketEndpoint = new SocketEndpoint(app);
  }
}
