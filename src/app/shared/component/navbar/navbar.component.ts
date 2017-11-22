import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable, Scheduler} from 'rxjs';
import {Socketeer} from './navbar.socketeer';
import * as moment from 'moment';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {SocketService} from '../../service/socket.service';

enum EMAIL_SUBSCRIPTION_STATE {
  NOT_SUBMITTED,
  SUBMITTING,
  SUBMITTED
}

const EMAIL_LOCAL_STORAGE_TOKEN = 'navbar-email-subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  EMAIL_SUBSCRIPTION_STATE: typeof EMAIL_SUBSCRIPTION_STATE = EMAIL_SUBSCRIPTION_STATE;
  emailSubscriptionState: EMAIL_SUBSCRIPTION_STATE = EMAIL_SUBSCRIPTION_STATE.NOT_SUBMITTED;
  title$: Observable<string>;
  description$: Observable<string>;
  countdown$: Observable<{ hour: number; minute: number; second: number }>;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[^ @]*@[^ @]*')
  ]);
  socketeer: Socketeer;
  formSubmitted: boolean;
  @ViewChild('emailInput') emailInput: ElementRef;


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

    if (localStorage.getItem(EMAIL_LOCAL_STORAGE_TOKEN)) {
      this.emailSubscriptionState = this.EMAIL_SUBSCRIPTION_STATE.SUBMITTED;
      this.emailFormControl.setValue(localStorage.getItem(EMAIL_LOCAL_STORAGE_TOKEN));
    }

    this.socketeer.toServer('INIT', {});
  }

  ngOnInit() {
    this.socketeer.fromServer('SUBSCRIBE')
      .subscribe(data => {
        localStorage.setItem(EMAIL_LOCAL_STORAGE_TOKEN, this.emailFormControl.value);
        this.emailSubscriptionState = this.EMAIL_SUBSCRIPTION_STATE.SUBMITTED;
      });
  }

  onSubmit_subscriptionForm(e) {
    this.formSubmitted = true;

    switch (this.emailSubscriptionState) {
      case this.EMAIL_SUBSCRIPTION_STATE.SUBMITTED:
        this.emailSubscriptionState = this.EMAIL_SUBSCRIPTION_STATE.NOT_SUBMITTED;
        this.emailFormControl.setValue('');
        this.formSubmitted = false;
        break;
      case this.EMAIL_SUBSCRIPTION_STATE.NOT_SUBMITTED:
        if (this.emailFormControl.valid) {
          this.emailSubscriptionState = this.EMAIL_SUBSCRIPTION_STATE.SUBMITTING;
          this.socketeer.toServer('SUBSCRIBE', {
            email: this.emailFormControl.value
          });
        }
        break;
    }

  }

}
