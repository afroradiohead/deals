import {SocketCommand} from './navbar.socket.command';
import {Socketeer} from '../../../../shared/class/socketeer';
import {HOST_CONFIG} from '../../../../server/host-config';


export class NavbarSocket {
  constructor(socket) {
    const socketeer = new Socketeer(SocketCommand, socket);

    socketeer.from('INIT_FROMCLIENT').subscribe(request => {

      socketeer.send('INIT_FROMSERVER', {
        title: HOST_CONFIG[socket.handshake.headers.host].title
      });
    });
  }
}
