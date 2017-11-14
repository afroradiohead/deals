import {Observable} from 'rxjs';

export abstract class ISocketCommand {
  readonly namespace: string;
  readonly events: {[event_name: string]: {[key: string]: any}};
}


export class Socketeer<T extends ISocketCommand> {
  constructor(private componentConstructor: new () => T, private socket) {}

  public send<K extends keyof T['events']>(key: K, value: T['events'][K]) {
    const socketCommand = new this.componentConstructor();
    this.socket.emit(`${socketCommand.namespace}/${key}`, value);
  }

  public from<K extends keyof T['events']>(key: K): Observable<T['events'][K]> {
    const socketCommand = new this.componentConstructor();

    return Observable.create(observer => {
      this.socket.on(`${socketCommand.namespace}/${key}`, (v) => observer.next(v));
    });
  }
}


// ======= New Socketeer

// preparation for new socketeer
interface ICommand {
  readonly CLIENT_EVENTS: {[event_name: string]: any};
  readonly SERVER_EVENTS: {[event_name: string]: any};
}

export abstract class ASocketeer<T extends ICommand> {
  readonly namespace: string;

  constructor(private socket: any) {}

  toClient<K extends keyof T['CLIENT_EVENTS']>(key: K, value: T['CLIENT_EVENTS'][K]) {
    this.socket.emit(`${this.namespace}/CLIENT_EVENTS/${key}`, value);
  }

  toServer<K extends keyof T['SERVER_EVENTS']>(key: K, value: T['SERVER_EVENTS'][K]) {
    this.socket.emit(`${this.namespace}/SERVER_EVENTS/${key}`, value);
  }

  fromClient<K extends keyof T['CLIENT_EVENTS']>(key: K): Observable<T['CLIENT_EVENTS'][K]> {
    return Observable.create(observer => {
      this.socket.on(`${this.namespace}/CLIENT_EVENTS/${key}`, (v) => observer.next(v));
    });
  }

  fromServer<K extends keyof T['SERVER_EVENTS']>(key: K): Observable<T['SERVER_EVENTS'][K]> {
    return Observable.create(observer => {
      this.socket.on(`${this.namespace}/SERVER_EVENTS/${key}`, (v) => observer.next(v));
    });
  }
}
