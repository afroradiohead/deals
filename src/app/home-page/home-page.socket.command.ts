import {IProduct} from '../../shared/interface/product';
import {ASocketeer, ISocketCommand} from '../../shared/class/socketeer';

export class SocketCommand extends ISocketCommand {
  namespace = 'home-page';
  events: {
    INIT_FROMCLIENT: {
      time?: boolean;
    },
    INIT_FROMSERVER: {
      title: string;
      description: string;
      productList: IProduct[];
    };
  };
}

// @todo use this sockeeter
export class Socketeer extends ASocketeer<{
  CLIENT_EVENTS: {
    INIT: {
      time?: boolean;
    }
  },
  SERVER_EVENTS: {
    INIT: {
      title: string;
      description: string;
      productList: IProduct[];
    }
  }
}> {
  namespace = 'home-page';
}
