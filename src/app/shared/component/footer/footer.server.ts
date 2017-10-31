import {SocketCommand} from './footer.socket';
import {Socketeer} from '../../../../shared/class/socketeer';
import {AmazonScheduler} from '../../../../server/scheduler/amazon';


export class FooterServer {
  constructor(socket) {
    const socketeer = new Socketeer(SocketCommand, socket);

    socketeer.from('INIT_FROMCLIENT').subscribe(request => {

      socketeer.send('INIT_FROMSERVER', {
        refreshTimestamp: AmazonScheduler.GetHydrationTimestamp(socket.handshake.headers.host)
      });
    });
  }
}
