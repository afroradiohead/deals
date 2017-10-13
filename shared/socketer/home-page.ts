import {Observable} from 'rxjs';
import {IProduct} from "../interface/product";

interface IRequest {
  time?: boolean;
}

interface IResponse {
  productList: IProduct[];
}

export class InitSocketeer {
  private request_event = 'home-page/init';
  private response_event = 'home-page/init.response';

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
