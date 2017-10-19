import {IProduct} from '../interface/product';
import {ISocketCommand} from './index';

export class SocketCommand implements ISocketCommand {
  namespace = 'product-page';

  events: {
    INIT_FROMCLIENT: {
      slug: string
    },
    INIT_FROMSERVER: {
      product: IProduct,
      randomProductList: IProduct[],
    };
  };
}
