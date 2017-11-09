import {SocketCommand} from './home-page.socket';
import {Socketeer} from '../../shared/class/socketeer';
import {HostDatabase} from "../../server/iridium/index";
import {HOST_CONFIG} from "../../server/host-config";

export class HomePageEndpoint {
  constructor(socket) {
    const socketeer = new Socketeer(SocketCommand, socket);

    socketeer.from('INIT_FROMCLIENT').subscribe(request => {
      const db = HostDatabase.Create();

      db.connect().then(() => db.Products.find({host: socket.handshake.headers.host}))
        .then(products => products.sort({ 'price.saved': -1 }).toArray())
        .then(productList => {
          socketeer.send('INIT_FROMSERVER', {
            title: HOST_CONFIG[socket.handshake.headers.host].title,
            description: HOST_CONFIG[socket.handshake.headers.host].description,
            productList: productList
          });
        })
        .then(() => db.close());
    });
  }
}
