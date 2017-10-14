import {Observable} from "rxjs";

export abstract class ASocketEvent<TPayload> {
  public abstract readonly event: string;
  public readonly payload: TPayload;
}

export class Socketeer {
  constructor(private socket) {}

  send<T extends ASocketEvent<any>>(type: {new(): T; }, payload: T['payload']) {
    this.socket.emit(new type().event, payload);
  }

  from<T extends ASocketEvent<any>>(type: {new(): T; }): Observable<T['payload']> {
    return Observable.create(observer => {
      this.socket.on(new type().event, (v) => observer.next(v));
    });
  }
}
