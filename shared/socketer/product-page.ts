import {IProduct} from '../interface/product';
import {ASocketEvent, Socketeer} from "./index";

export class SocketEvent_Init_FromClient extends ASocketEvent<{
  slug: string;
}> {
  event = 'product-page/init';
}
export class SocketEvent_Init_FromServer extends ASocketEvent<{
  product: IProduct;
}> {
  event = 'product-page/init.response';
}
