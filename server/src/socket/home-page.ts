import {productList} from '../model/product';
import {SocketCommand} from '../../../shared/socketer/home-page';
import {Socketeer} from '../../../shared/socketer/index';

export class HomePageEndpoint {
  constructor(socket) {
    const socketeer = new Socketeer(SocketCommand, socket);

    socketeer.from('INIT_FROMCLIENT')
      .subscribe(request => {
        socketeer.send('INIT_FROMSERVER', {
          productList: productList
        });
      });
  }
}
