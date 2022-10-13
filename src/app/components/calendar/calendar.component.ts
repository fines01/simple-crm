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
  displayMonth!: string;

  constructor() { }

  ngOnInit() {
    this.displayMonth = this.months[this.viewDate.getMonth()];
    for(let i = 0; i <= this.viewDate.getDay(); i++) {
        this.state.push(new Date(this.startDay));
        this.startDay.setDate(this.startDay.getDate()+1);
    }
    for(let j =  this.firstDay.getDate(); j <= this.lastDay.getDate(); j++) {
      this.state.push(new Date(this.firstDay));
      this.firstDay.setDate(this.firstDay.getDate()+1);
    }
    // this.state.map( item => {
    //   console.log(item));
    // })
  }

  next() {
    this.state = [];   
    this.viewDate.setMonth(this.viewDate.getMonth()+1);
    this.displayMonth = this.months[this.viewDate.getMonth()];

    this.firstDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    this.lastDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0);
    this.startDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(),  (this.firstDay.getDate())-this.correctWeekIndex(this.firstDay));

    let calendarDay = this.startDay;
    let surplusDays = (+this.firstDay - +this.startDay) / (1000 * 60 * 60 * 24);

    for(let i = 0 ; i < this.lastDay.getDate() + surplusDays ; i++) {
      this.state.push(new Date(calendarDay));
      calendarDay.setDate(calendarDay.getDate()+1);
    }
  }

  
  previous() {
    this.state = [];
    this.viewDate.setMonth(this.viewDate.getMonth()-1);
    this.displayMonth = this.months[this.viewDate.getMonth()];

    this.firstDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    this.lastDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0);
    this.startDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(),  (this.firstDay.getDate())-this.correctWeekIndex(this.firstDay));
    
    let calendarDay = this.startDay;
    let surplusDays = (+this.firstDay - +this.startDay) / (1000 * 60 * 60 * 24);

    for(let i = 0 ; i < this.lastDay.getDate() + surplusDays ; i++) {
      this.state.push(new Date(calendarDay));
      calendarDay.setDate(calendarDay.getDate()+1);
    }
  }

  private correctWeekIndex(date: Date): number {
    return (date.getDay() + 6)%7;
  }

}
