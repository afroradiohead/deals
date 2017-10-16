import {productList} from '../model/product';
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
        .then(productList2 => {
          socketeer.send('INIT_FROMSERVER', {
            productList2: productList2,
            productList: productList
          });
          console.log(productList2);
        })
        .then(() => db.close());

      socketeer.send('INIT_FROMSERVER', {
        productList: productList
      });
    });
  }
}
