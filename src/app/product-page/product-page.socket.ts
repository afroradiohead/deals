import {SocketCommand} from './product-page.socket.command';
import {Socketeer} from '../../shared/class/socketeer';
import {Observable} from 'rxjs/Observable';
import {IProduct} from '../../shared/interface/product';
import {HostDatabase} from '../../server/iridium/index';

export class ProductPageServer {
  constructor(socket) {
    const socketeer = new Socketeer(SocketCommand, socket);

    socketeer.from('INIT_FROMCLIENT').subscribe(request => {
      const db = HostDatabase.Create();
      const slug = request.slug.toLowerCase().trim();


      Observable.fromPromise(db.connect())
        .mergeMap(() => {
          const product$ = Observable.fromPromise(db.Products.findOne({
            host: socket.handshake.headers.host,
            slug: slug
          }));
          const randomProductList$ = Observable.fromPromise(db.Products.aggregate([
            {$match: {host: socket.handshake.headers.host, slug: {$ne: slug}}},
            {$sample: { size: 3 }}
          ]));
          return product$.combineLatest(randomProductList$);
        })
        .subscribe(data => {
          const product = data[0];
          const randomProductList = data[1] as IProduct[];

          socketeer.send('INIT_FROMSERVER', {
            product: product,
            randomProductList: randomProductList
          });
          db.close();
        });
    });
  }
}
