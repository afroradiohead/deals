import {HOST_CONFIG} from '../../../../server/host-config';
import {Socketeer} from './navbar.socketeer';
import {AmazonScheduler} from '../../../../server/scheduler/amazon';
import {HostDatabase} from '../../../../server/iridium/index';


export class NavbarSocket {
  constructor(socket) {
    const socketeer = new Socketeer(socket);

    socketeer.fromClient('INIT').subscribe(request => {

      socketeer.toClient('INIT', {
        title: HOST_CONFIG[socket.handshake.headers.host].title,
        description: HOST_CONFIG[socket.handshake.headers.host].description,
        refreshTimestamp: AmazonScheduler.GetHydrationTimestamp(socket.handshake.headers.host)
      });
    });

    socketeer.fromClient('SUBSCRIBE').subscribe(request => {
      const db = HostDatabase.Create();
      const email = request.email; // validate it is an email

      db.connect().then(() => {
        return db.EmailSubscription.update(
          { email: email, host: socket.handshake.headers.host },
          {
            email: email,
            host: socket.handshake.headers.host,
            active: true
          },
          { upsert: true, multi: false }
        );
      })
        .then(productSubscription => {
          socketeer.toClient('SUBSCRIBE', {});
        })
        .then(() => db.close());
    });
  }
}
