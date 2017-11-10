import * as socket from 'socket.io';
import {ProductPageServer} from '../../app/product-page/product-page.socket';
import {HomePageEndpoint} from '../../app/home-page/home-page.socket';
import {BuyPageEndpoint} from '../../app/buy-page/buy-page.socket';
import {FooterServer} from '../../app/shared/component/footer/footer.socket';
import {ProductCardServer} from '../../app/shared/component/product-card/product-card.socket';
import {Server} from "../../app/shared/component/product-subscription-modal/product-subscription-modal.socket";
import {NavbarSocket} from "../../app/shared/component/navbar/navbar.socket";

const socketEndpointClassList = [
  HomePageEndpoint, ProductPageServer, BuyPageEndpoint, FooterServer, ProductCardServer,
  Server, NavbarSocket
];

export class SocketEndpoint {
  constructor(app) {
    const io = socket(app.get('httpServer'));

    io.on('connection', (socket) => {
      socketEndpointClassList.forEach(socketEndpointClass => new socketEndpointClass(socket));
    });

  }
}
