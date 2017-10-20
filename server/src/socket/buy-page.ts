import {SocketCommand} from '../../../shared/socketer/buy-page';
import {Socketeer} from '../../../shared/socketer/index';
import {HostDatabase} from '../iridium/index';

export class BuyPageEndpoint {
  constructor(socket) {
    const socketeer = new Socketeer(SocketCommand, socket);

    socketeer.from('INIT_FROMCLIENT').subscribe(request => {
      const db = HostDatabase.Create();

      db.connect().then(() => db.Products.findOne(request.id))
        .then(product => {
          socketeer.send('INIT_FROMSERVER', {
            product: product.toJSON()
          });
        })
        .then(() => db.close());
    });
  }
}
