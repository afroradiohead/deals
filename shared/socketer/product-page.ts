import {Observable} from 'rxjs';
import {IProduct} from '../interface/product';


interface IRequest {
  slug: string;
}
interface IResponse {
  product: IProduct;
}


export class InitSocketeer {
  request_event = 'product-page/init';
  response_event = 'product-page/init.response';

  constructor(private socket) {}

  sendRequest(v: IRequest) {
    this.socket.emit(this.request_event, v);
  }

  sendResponse(v: IResponse) {
    this.socket.emit(this.response_event, v);
  }

  fromRequest(): Observable<IRequest> {
    return Observable.create(observer => {
      this.socket.on(this.request_event, (v) => observer.next(v));
    });
  }

  fromResponse(): Observable<IResponse> {
    return Observable.create(observer => {
      this.socket.on(this.response_event, (v) => observer.next(v));
    });
  }
}
