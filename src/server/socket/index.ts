import * as socket from 'socket.io';
import {ProductPageServer} from '../../app/product-page/product-page.server';
import {HomePageEndpoint} from '../../app/home-page/home-page.server';
import {BuyPageEndpoint} from '../../app/buy-page/buy-page.server';
import {FooterServer} from '../../app/shared/component/footer/footer.server';
import {ProductCardServer} from '../../app/shared/component/product-card/product-card.server';

const socketEndpointClassList = [
  HomePageEndpoint, ProductPageServer, BuyPageEndpoint, FooterServer, ProductCardServer
];

export class SocketEndpoint {
  constructor(app) {
    const io = socket(app.get('httpServer'));

    io.on('connection', (socket) => {
      socketEndpointClassList.forEach(socketEndpointClass => new socketEndpointClass(socket));
    });

  }
}
