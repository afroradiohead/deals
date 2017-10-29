import { Injectable } from '@angular/core';
import * as socketIO from 'socket.io-client';
import { environment } from '../../../environments/environment';


const socketUrl = environment.production ? location.origin : 'http://localhost:8080';

@Injectable()
export class SocketService {
  public socket;

  constructor() {
    this.socket = socketIO(socketUrl);
  }

}
