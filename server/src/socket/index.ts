import * as socket from "socket.io";
import {HomePageEndpoint} from "./home-page";
import {ProductPageEndpoint} from "./product-page";

const socketEndpointClassList = [
  HomePageEndpoint, ProductPageEndpoint
]

export class SocketEndpoint {
  constructor(app) {
    const io = socket(app.get('httpServer'));

    io.on("connection", (socket) => {
      socketEndpointClassList.forEach(socketEndpointClass => new socketEndpointClass(socket));
    });

  }
}
