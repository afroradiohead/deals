import {productList} from "../model/product";
import {SocketEvent_Init_FromClient, SocketEvent_Init_FromServer} from "../../../shared/socketer/product-page";
import {Socketeer} from "../../../shared/socketer/index";

export class ProductPageEndpoint {
  constructor(socket) {
    const socketeer = new Socketeer(socket);

    socketeer.from(SocketEvent_Init_FromClient)
      .subscribe(request => {
        socketeer.send(SocketEvent_Init_FromServer, {
          product: productList.find(product => product.slug === request.slug.toLowerCase().trim())
        });
      });
  }
}
