import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  countdown$: Observable<{ hour: number; minute: number; second: number }>;
  constructor() {
    this.countdown$ = Observable.of({
      hour: 4,
      minute: 30,
      second: 20
    });
  }

  ngOnInit() {
  }

}
