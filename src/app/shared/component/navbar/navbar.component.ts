import { Component, OnInit } from '@angular/core';
import {Observable, Scheduler} from 'rxjs';
import {SocketService} from '../../service/socket.service';
import {Socketeer} from './navbar.socketeer';
import moment = require('moment');
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from "@angular/material";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title$: Observable<string>;
  description$: Observable<string>;
  countdown$: Observable<{ hour: number; minute: number; second: number }>;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[^ @]*@[^ @]*')
  ]);
  socketeer: Socketeer;
  formSubmitted: boolean;

  constructor(socketService: SocketService, private snackbar: MatSnackBar) {
    this.socketeer = new Socketeer(socketService.socket);

    this.title$ = this.socketeer.fromServer('INIT')
      .map(r => r.title);
    this.description$ = this.socketeer.fromServer('INIT')
      .map(r => r.description);

    this.countdown$ = this.socketeer.fromServer('INIT')
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

    this.socketeer.toServer('INIT', {});
  }

  ngOnInit() {
    this.socketeer.fromServer('SUBSCRIBE')
      .first()
      .subscribe(data => {
        this.snackbar.open(`Awesome! We'll notify you when the price changes.`, 'Close', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  onSubmit_subscriptionForm(e) {
    this.formSubmitted = true;

    if (this.emailFormControl.valid) {
      console.log(this.emailFormControl.value);
      this.socketeer.toServer('SUBSCRIBE', {
        email: this.emailFormControl.value
      });
    }
  }

}
