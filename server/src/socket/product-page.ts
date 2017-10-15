import {productList} from '../model/product';
import {SocketCommand} from '../../../shared/socketer/product-page';
import {Socketeer} from '../../../shared/socketer/index';

export class ProductPageEndpoint {
  constructor(socket) {
    const socketeer = new Socketeer(SocketCommand, socket);

    socketeer.from('INIT_FROMCLIENT')
      .subscribe(request => {
        socketeer.send('INIT_FROMSERVER', {
          product: productList.find(product => product.slug === request.slug.toLowerCase().trim())
        });
      });
  }
}
