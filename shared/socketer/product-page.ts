import {IProduct} from '../interface/product';
import {ASocketCommand} from './index';

export class SocketCommand extends ASocketCommand {
  namespace = 'product-page';
  events: {
    INIT_FROMCLIENT: {
      slug: string
    },
    INIT_FROMSERVER: {
      product: IProduct
    };
  };
}
