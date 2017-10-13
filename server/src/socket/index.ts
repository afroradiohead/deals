import * as socket from "socket.io";
import {HomePageEndpoint} from "./home-page";

export class SocketEndpoint {
  constructor(app) {
    const io = socket(app.get('httpServer'));

    io.on("connection", (socket) => {
      const homePageEndpoint = new HomePageEndpoint(socket);

      socket.on("home/init", homePageEndpoint.init.bind(homePageEndpoint));
    });

  }
}
