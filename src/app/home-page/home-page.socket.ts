import {IProduct} from '../../shared/interface/product';
import {ISocketCommand} from '../../shared/class/socketeer';

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
