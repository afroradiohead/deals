import {ISocketCommand} from "../../../../shared/class/socketeer";

export class SocketCommand extends ISocketCommand {
  namespace = 'shared/component/product-card';
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
