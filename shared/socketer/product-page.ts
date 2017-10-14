import {IProduct} from '../interface/product';
import {ASocketEvent, Socketeer} from "./index";


interface IInitRequest {
  slug: string;
}
interface IInitResponse {
  product: IProduct;
}
export class InitSocketeer extends Socketeer<IInitRequest, IInitResponse> {
  request_event = 'product-page/init';
  response_event = 'product-page/init.response';
}

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
