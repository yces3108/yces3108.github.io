import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-calendar-date',
  animations: [
    trigger('expand', [
      // ...
      state('open', style({
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        backgroundColor: 'green'
      })),
      transition('* => *', [
        animate('0.05s')
      ])
    ]),
  ],
  templateUrl: './calendar-date.component.html',
  styleUrls: ['./calendar-date.component.css']
})
export class CalendarDateComponent implements OnInit {
  @Input() today: Date;
  year: number;
  month: number;
  date: number

  constructor() { }

  ngOnInit(): void{
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth();
    this.date = this.today.getDate();
  }


}
