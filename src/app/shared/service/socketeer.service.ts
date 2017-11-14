import { Injectable } from '@angular/core';
import {SocketService} from './socket.service';
import {ISocketCommand, Socketeer} from '../../../shared/class/socketeer';

@Injectable()
export class SocketeerService<T>{

  constructor(private socketService: SocketService) {

  }

  create(socketCommandClass) {
    console.log(socketCommandClass);
    return new Socketeer(socketCommandClass, this.socketService.socket);
  }

}
