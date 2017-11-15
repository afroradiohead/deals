import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {SocketCommand} from "./navbar.socket.command";
import {Socketeer} from '../../../../shared/class/socketeer';
import {SocketService} from "../../service/socket.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private socketeer: Socketeer<SocketCommand>;
  title$: Observable<string>;
  countdown$: Observable<{ hour: number; minute: number; second: number }>;

  constructor(socketService: SocketService) {
    this.countdown$ = Observable.of({
      hour: 4,
      minute: 30,
      second: 20
    });
    this.socketeer = new Socketeer(SocketCommand, socketService.socket);

    this.title$ = this.socketeer.from('INIT_FROMSERVER')
      .map(r => r.title);

    this.socketeer.send('INIT_FROMCLIENT', {});
  }

  ngOnInit() {

  }

}
