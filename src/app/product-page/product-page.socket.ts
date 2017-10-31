import {IProduct} from '../../shared/interface/product';
import {ISocketCommand} from '../../shared/class/socketeer';

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
