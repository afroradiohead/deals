import {SocketCommand} from './buy-page.socket.command';
import {Socketeer} from '../../shared/class/socketeer';
import {HostDatabase} from '../../server/iridium/index';

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
