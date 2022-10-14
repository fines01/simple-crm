import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  
  weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  months = ['Jan.', 'Feb.', 'Mar.','Apr.','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'];
  viewDate: Date = new Date();
  firstDay: Date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
  lastDay: Date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0);
  state: Date[] = [];
  // get first monday of current month:
  startDay: Date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), (this.lastDay.getDate()-this.firstDay.getDate())-this.viewDate.getDay());
  // TODO decide: should cal also go until sun of last week?
  endDay!: Date;
  displayMonth!: string;
  today!: Date;
  surplusDays: number[] = [];
  todayIndex!: number | null;

  constructor() { }

  ngOnInit() {
    this.today = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate());
    this.displayMonth = this.months[this.viewDate.getMonth()];
    this.setMonth(0);
  }

  next() {
    this.todayIndex = null;
    this.setMonth(+1)
  }

  previous() {
    this.todayIndex = null;
    this.setMonth(-1)
  }

  setMonth(step: number) { // integer-number [-1,1]
    this.state = [];
    this.viewDate.setMonth(this.viewDate.getMonth() + step);
    this.displayMonth = this.months[this.viewDate.getMonth()];
    this.firstDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    this.lastDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0);
    this.startDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(),  (this.firstDay.getDate())-this.correctWeekIndex(this.firstDay));
    this.endDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), (this.lastDay.getDate()+ (6-this.correctWeekIndex(this.lastDay) ) ));

    this.fillGrid(this.firstDay, this.startDay, this.endDay, this.lastDay);
  }

  fillGrid(firstDay: Date, startDay: Date, endDay: Date, lastDay:Date) {
    this.surplusDays = [];
    let lastMonthDays = (+firstDay - +startDay) / (1000 * 60 * 60 * 24);
    let nextMonthDays = (+endDay - +lastDay) / (1000 * 60 * 60 * 24);
    let surplusDays = lastMonthDays + nextMonthDays;
    
    for(let i = 0 ; i < this.lastDay.getDate() + surplusDays ; i++) {
      this.state.push(new Date(startDay));
      if (this.state[i] < firstDay || this.state[i] > lastDay) this.surplusDays.push(i);
      if (this.state[i].getTime() === this.today.getTime()) this.todayIndex = i;
      startDay.setDate(startDay.getDate()+1);
    }
  }

  isSurplusDay(index: number) {
    if (this.surplusDays.indexOf(index) !== -1) return true;
    return false;
  }

  correctWeekIndex(date: Date): number {
    return (date.getDay() + 6)%7;
  }

}
