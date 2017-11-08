import {ISocketCommand} from '../../../../shared/class/socketeer';

export class SocketCommand implements ISocketCommand {
  namespace = 'shared/component/product-subscription-modal';

  events: {
    SUBSCRIBE_FROMCLIENT: {
      productId: string;
      email: string;
    },
    SUBSCRIBE_FROMSERVER: {
      // productList: IProduct[];
    };
  };
}
