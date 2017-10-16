import {SocketCommand} from '../../../shared/socketer/home-page';
import {Socketeer} from '../../../shared/socketer/index';
import {MyDatabase} from '../iridium/index';

export class HomePageEndpoint {
  constructor(socket) {
    const socketeer = new Socketeer(SocketCommand, socket);

    socketeer.from('INIT_FROMCLIENT').subscribe(request => {
      const db = MyDatabase.Create();

      db.connect().then(() => db.Products.find())
        .then(products => products.toArray())
        .then(productList => {
          socketeer.send('INIT_FROMSERVER', {
            productList: productList
          });
        })
        .then(() => db.close());
    });
  }
}
