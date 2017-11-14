import {IProduct} from '../../shared/interface/product';
import {ISocketCommand} from '../../shared/class/socketeer';
import {Observable} from "rxjs/Observable";

export class SocketCommand extends ISocketCommand {
  namespace = 'home-page';
  events: {
    INIT_FROMCLIENT: {
      time?: boolean;
    },
    INIT_FROMSERVER: {
      title: string;
      description: string;
      productList: IProduct[];
    };
  };
}


// preparation for new socketeer
interface ISocketCommand2 {
  readonly CLIENT_EVENTS: {[event_name: string]: any};
  readonly SERVER_EVENTS: {[event_name: string]: any};
}

export abstract class ASocketCommand2<T extends ISocketCommand2> {
  readonly namespace: string;

  constructor(private socket: any) {

  }

  toClient<K extends keyof T['CLIENT_EVENTS']>(key: K, value: T['CLIENT_EVENTS'][K]) {
    this.socket.emit(`${this.namespace}/${key}`, value);
  }

  toServer<K extends keyof T['SERVER_EVENTS']>(key: K, value: T['SERVER_EVENTS'][K]) {
    this.socket.emit(`${this.namespace}/${key}`, value);
  }

  fromClient<K extends keyof T['CLIENT_EVENTS']>(key: K): Observable<T['CLIENT_EVENTS'][K]> {
    return Observable.create(observer => {
      this.socket.on(`${this.namespace}/${key}`, (v) => observer.next(v));
    });
  }

  fromServer<K extends keyof T['SERVER_EVENTS']>(key: K): Observable<T['SERVER_EVENTS'][K]> {
    return Observable.create(observer => {
      this.socket.on(`${this.namespace}/${key}`, (v) => observer.next(v));
    });
  }
}

export class SocketCommand2 extends ASocketCommand2<{
  CLIENT_EVENTS: {
    INIT: {
      time?: boolean;
    }
  },
  SERVER_EVENTS: {
    INIT: {
      title: string;
      description: string;
      productList: IProduct[];
    }
  }
}> {
  namespace = 'home-page';
}
