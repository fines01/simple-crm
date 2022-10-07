import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  secAnimationDelay!: string;
  minAnimationDelay!: string;
  hourAnimationDelay!: string;

  @Input() clockSize!: number; // clocl width & height in px, set css variables

  constructor() { }

  ngOnInit(): void {
    let now = new Date();
    this.setClock(now);
  }

  setClock(now: Date) {
    //let now = new Date();
    let currentYear, currentMonthIndex, currentDay;
    [currentYear, currentMonthIndex, currentDay] = [now.getFullYear(), now.getMonth(), now.getDate()];
    let currentDayStart =  new Date(currentYear, currentMonthIndex, currentDay);
    let secondsToday = Math.round((+now - +currentDayStart) / 1000);
    let seconds = ((secondsToday / 60) % 1) * 60;
    let minutes = ((secondsToday / 3600) % 1) * 3600;
    let hours = ((secondsToday / 43200) %1) * 43200;
    this.hourAnimationDelay = hours * -1 + 's';
    this.minAnimationDelay = minutes * -1 + 's';
    this.secAnimationDelay = seconds * -1 + 's';
  }


}
