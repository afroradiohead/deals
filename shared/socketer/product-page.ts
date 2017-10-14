import {IProduct} from '../interface/product';
import {Socketeer} from "./index";


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
