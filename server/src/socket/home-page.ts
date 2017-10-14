import {productList} from "../model/product";
import {SocketEvent_Init_FromClient, SocketEvent_Init_FromServer} from "../../../shared/socketer/home-page";
import {Socketeer} from "../../../shared/socketer/index";

export class HomePageEndpoint {
  constructor(socket) {
    const socketeer = new Socketeer(socket);


    socketeer.from(SocketEvent_Init_FromClient)
      .subscribe(request => {

        socketeer.send(SocketEvent_Init_FromServer, {
          productList: productList
        });
      });
  }
}
