import { Injectable } from '@angular/core';
import * as socketIO from 'socket.io-client';
// import * as socketIOServer from 'socket.io';
import { environment } from '../../../environments/environment';

// const socketUrl = environment.production ? location.origin : 'http://localhost:8080';
const socketUrl = 'http://localhost:8080';

@Injectable()
export class SocketService {
  public socket;


  constructor() {
    try {
      console.log('asdfsaf');
      this.socket = socketIO('/');
    } catch(ex){

    }

  }

}
