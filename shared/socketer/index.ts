import {Observable} from "rxjs";

export abstract class ASocketCommand {
  public abstract readonly namespace: string;
  public abstract readonly events: {[event_name: string]: {[key: string]: any}};
}

export class Socketeer<T extends ASocketCommand> {
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
