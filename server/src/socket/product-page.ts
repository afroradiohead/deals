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
      const slug = request.slug.toLowerCase().trim();

      Observable.fromPromise(db.connect())
        .mergeMap(() => {
          const product$ = Observable.fromPromise(db.Products.findOne({
            slug: slug
          }));
          const randomProductList$ = Observable.fromPromise(db.Products.aggregate([
            {$match: {domain: socket.handshake.query.domain, slug: {$ne: slug}}},
            {$sample: { size: 3 }}
          ]));
          return product$.combineLatest(randomProductList$);
        })
        .subscribe(data => {
          const product = data[0];
          const randomProductList = data[1] as IProduct[];

          console.log(product);

          socketeer.send('INIT_FROMSERVER', {
            product: product,
            randomProductList: randomProductList
          });
          db.close();
        });
    });
  }
}
