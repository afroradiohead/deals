import {IProduct} from '../interface/product';
import {ISocketCommand} from './index';

export class SocketCommand extends ISocketCommand {
  namespace = 'home-page';
  events: {
    INIT_FROMCLIENT: {
      time?: boolean;
    },
    INIT_FROMSERVER: {
      productList: IProduct[];
    };
  };
}
