import {SocketCommand} from './product-card.socket.command';
import {Socketeer} from '../../../../shared/class/socketeer';
import {HostDatabase} from '../../../../server/iridium/index';

export class ProductCardServer {
  constructor(socket) {
    const socketeer = new Socketeer(SocketCommand, socket);

    socketeer.from('SUBSCRIBE_FROMCLIENT').subscribe(request => {
      const db = HostDatabase.Create();
      const email = request.email; // validate it is an email
      const productId = request.productId; // validate it exists

      db.connect().then(() => {
        return db.ProductSubscription.update(
          { email: email, productId: productId, host: socket.handshake.headers.host },
          {
            email: email,
            productId: productId,
            host: socket.handshake.headers.host,
            active: true
          },
          { upsert: true, multi: false }
        );
      })
        .then(() => {
          return db.ProductSubscription.findOne({
            email: email,
            productId: productId
          });
        })
        .then(productSubscription => {
          socketeer.send('SUBSCRIBE_FROMSERVER', {});
        })
        .then(() => db.close());
    });
  }
}
