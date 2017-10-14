import {IProduct} from '../interface/product';
import {ASocketEvent} from './index';

export class SocketEvent_Init_FromClient extends ASocketEvent<{
  time?: boolean;
}> {
  event = 'home-page/init';
}
export class SocketEvent_Init_FromServer extends ASocketEvent<{
  productList: IProduct[];
}> {
  event = 'home-page/init.server';
}
