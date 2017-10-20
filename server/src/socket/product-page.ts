import {SocketCommand} from '../../../shared/socketer/product-page';
import {Socketeer} from '../../../shared/socketer/index';
import {HostDatabase} from '../iridium/index';
import {Observable} from 'rxjs/Observable';
import {IProduct} from '../../../shared/interface/product';

export class ProductPageEndpoint {
  constructor(socket) {
    const socketeer = new Socketeer(SocketCommand, socket);

    socketeer.from('INIT_FROMCLIENT').subscribe(request => {
      const db = HostDatabase.Create();

      // Observable.fromPromise(db.connect())
      //   .mergeMap(() => {
      //     return Observable.fromPromise(db.Products.findOne({
      //       slug: request.slug.toLowerCase().trim(),
      //       domain: socket.handshake.query.domain
      //     })).combineLatest(
      //       Observable.fromPromise(db.Products.aggregate([
      //         {$match: {domain: socket.handshake.query.domain, slug: {$ne: request.slug}}},
      //         {$sample: { size: 3 }}
      //       ]))
      //     );
      //   })
      //   .subscribe(data => {
      //     const product = data[0];
      //     const randomProductList = data[1] as IProduct[];
      //
      //     socketeer.send('INIT_FROMSERVER', {
      //       product: product.toJSON(),
      //       randomProductList: randomProductList
      //     });
      //     db.close();
      //   });
    });
  }
}
