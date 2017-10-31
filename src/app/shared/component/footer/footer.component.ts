import { Component, OnInit } from '@angular/core';
import {Socketeer} from '../../../../shared/class/socketeer';
import {SocketCommand} from './footer.socket';
import {SocketService} from '../../service/socket.service';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {Scheduler} from 'rxjs/Rx';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private socketeer: Socketeer<SocketCommand>;
  countdown$: Observable<{ hour: number; minute: number; second: number }>;

  constructor(socketService: SocketService) {
    this.socketeer = new Socketeer(SocketCommand, socketService.socket);

    this.countdown$ = this.socketeer.from('INIT_FROMSERVER')
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

    this.socketeer.send('INIT_FROMCLIENT', {});
  }

  ngOnInit() {
  }

}
