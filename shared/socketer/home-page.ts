import {IProduct} from '../interface/product';
import {ASocketCommand} from './index';

export class SocketCommand extends ASocketCommand {
  namespace = 'home-page';
  events: {
    INIT_FROMCLIENT: {
      time?: boolean;
    },
    INIT_FROMSERVER: {
      productList: IProduct[]
    };
  };
}
