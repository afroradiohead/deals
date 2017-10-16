import {SocketCommand} from '../../../shared/socketer/product-page';
import {Socketeer} from '../../../shared/socketer/index';
import {MyDatabase} from "../iridium/index";

export class ProductPageEndpoint {
  constructor(socket) {
    const socketeer = new Socketeer(SocketCommand, socket);

    socketeer.from('INIT_FROMCLIENT').subscribe(request => {
      const db = MyDatabase.Create();

      db.connect().then(() => db.Products.findOne({
        slug: request.slug.toLowerCase().trim()
      }))
        .then(product => {
          socketeer.send('INIT_FROMSERVER', {
            product: product.toJSON()
          });
        })
        .then(() => db.close());
    });
  }
}
