import {HOST_CONFIG} from '../../../../server/host-config';
import {Socketeer} from "./navbar.socketeer";
import {AmazonScheduler} from "../../../../server/scheduler/amazon";


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
  }
}
