import {IProduct} from '../interface/product';
import {ISocketCommand} from './index';

export class SocketCommand implements ISocketCommand {
  namespace = 'buy-page';

  events: {
    INIT_FROMCLIENT: {
      id: string
    },
    INIT_FROMSERVER: {
      product: IProduct
    };
  };
}
