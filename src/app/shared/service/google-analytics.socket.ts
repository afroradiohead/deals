import {Socketeer} from './google-analytics.socketeer';
import {HOST_CONFIG} from '../../../server/host-config';

export class GoogleAnalyticsSocket {
  constructor(socket) {
    const socketeer = new Socketeer(socket);

    socketeer.fromClient('INIT').subscribe(request => {
      socketeer.toClient('INIT', {
        gaId: HOST_CONFIG[socket.handshake.headers.host].gaId
      });
    });
  }
}
