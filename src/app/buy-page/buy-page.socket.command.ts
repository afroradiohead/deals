import {IProduct} from '../../shared/interface/product';
import {ISocketCommand} from '../../shared/class/socketeer';

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
