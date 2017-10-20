import {SocketCommand} from '../../../shared/socketer/home-page';
import {Socketeer} from '../../../shared/socketer/index';
import {HostDatabase} from '../iridium/index';

export class HomePageEndpoint {
  constructor(socket) {
    const socketeer = new Socketeer(SocketCommand, socket);

    socketeer.from('INIT_FROMCLIENT').subscribe(request => {
      const db = HostDatabase.Create();

      // db.connect().then(() => db.Products.find({domain: socket.handshake.query.domain}))
      db.connect().then(() => db.Products.find({host: socket.handshake.headers.host}))
        .then(products => products.toArray())
        .then(productList => {
          socketeer.send('INIT_FROMSERVER', {
            domain: socket.handshake.query.domain,
            productList: productList
          });
        })
        .then(() => db.close());
    });
  }
}
