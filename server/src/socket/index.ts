import * as socket from "socket.io";
import {HomePageEndpoint} from "./home-page";
import {ProductPageEndpoint} from "./product-page";

export class SocketEndpoint {
  constructor(app) {
    const io = socket(app.get('httpServer'));

    io.on("connection", (socket) => {
      const homePageEndpoint = new HomePageEndpoint(socket);

      const productPageEndpoint = new ProductPageEndpoint(socket);
      socket.on("product-page/init", productPageEndpoint.init.bind(productPageEndpoint));
    });

  }
}
