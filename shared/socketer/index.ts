import {Observable} from "rxjs";

export abstract class Socketeer<TIRequest = any, TIReponse = any> {
  protected abstract readonly request_event: string;
  protected abstract readonly response_event: string;

  constructor(private socket) {}

  sendRequest(v: TIRequest) {
    this.socket.emit(this.request_event, v);
  }

  sendResponse(v: TIReponse) {
    this.socket.emit(this.response_event, v);
  }

  fromRequest(): Observable<TIRequest> {
    return Observable.create(observer => {
      this.socket.on(this.request_event, (v) => observer.next(v));
    });
  }

  fromResponse(): Observable<TIReponse> {
    return Observable.create(observer => {
      this.socket.on(this.response_event, (v) => observer.next(v));
    });
  }
}
