import {IProduct} from "../interface/product";
import {Socketeer} from "./index";

interface IInitRequest {
  time?: boolean;
}
interface IInitResponse {
  productList: IProduct[];
}
export class InitSocketeer extends Socketeer<IInitRequest, IInitResponse> {
  request_event = 'home-page/init';
  response_event = 'home-page/init.response';
}
