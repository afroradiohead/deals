import { Injectable } from '@angular/core';
import {SocketService} from './socket.service';
import {ISocketCommand, Socketeer} from '../../../shared/class/socketeer';

@Injectable()
export class SocketeerService {

  constructor(private socketService: SocketService) {

  }

  create(SocketCommand) {
    return new Socketeer(SocketCommand, this.socketService.socket);
  }

}
