import { Component, OnInit } from '@angular/core';
import {Observable, Scheduler} from 'rxjs';
import {SocketService} from '../../service/socket.service';
import {Socketeer} from './navbar.socketeer';
import moment = require('moment');


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title$: Observable<string>;
  description$: Observable<string>;
  countdown$: Observable<{ hour: number; minute: number; second: number }>;

  constructor(socketService: SocketService) {
    const socketeer = new Socketeer(socketService.socket);

    this.title$ = socketeer.fromServer('INIT')
      .map(r => r.title);
    this.description$ = socketeer.fromServer('INIT')
      .map(r => r.description);

    this.countdown$ = socketeer.fromServer('INIT')
      .map(response => response.refreshTimestamp)
      .combineLatest(Observable.interval(1000, Scheduler.animationFrame))
      .map(data => {
        const refreshTimestamp = data[0];
        const millisecondDiff = moment(refreshTimestamp).diff(moment());
        const duration = moment.duration(millisecondDiff, 'milliseconds');

        return {
          hour: millisecondDiff > 0 ? duration.get('hour') : 0,
          minute: millisecondDiff > 0 ? duration.get('minute') : 0,
          second: millisecondDiff > 0 ? duration.get('second') : 0,
        };
      });

    socketeer.toServer('INIT', {});
  }

  ngOnInit() {

  }

}
