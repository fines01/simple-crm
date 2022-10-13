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
  //newDate: Date = new Date();
  displayMonth!: string;

  constructor() { }

  ngOnInit() {
    //this.newDate.setMonth(this.viewDate.getMonth()-1);
    this.displayMonth = this.months[this.viewDate.getMonth()];
    // day of first day of first week of the current month (first monday of current month):
    //console.log(this.viewDate.getDay()); // day index (sun == 0)
    console.log (this.startDay)

    for(let i=0;i<=this.viewDate.getDay();i++) {
        this.state.push(new Date(this.startDay));
        this.startDay.setDate(this.startDay.getDate()+1);
    }

    for(let _item =  this.firstDay.getDate(); _item<=this.lastDay.getDate(); _item++) {
      this.state.push(new Date(this.firstDay));
      this.firstDay.setDate(this.firstDay.getDate()+1);
    }
    // this.state.map( item => {
    //   console.log(item);
    // })

  }

  next() {
    this.state = [];   
    this.viewDate.setMonth(this.viewDate.getMonth()+1);
    this.displayMonth = this.months[this.viewDate.getMonth()];
    
    this.firstDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    this.lastDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0);

    this.startDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(),  (this.firstDay.getDate())-this.correctWeekIndex(this.firstDay));
    
    console.log(this.viewDate, this.viewDate.getDay(), this.startDay); // correct: weekday of curr day of next month
    console.log(this.startDay.getDate());

    let calendarDay = this.startDay;
    let surplusDays = (+this.firstDay - +this.startDay) / (1000 * 60 * 60 * 24);
    console.log(surplusDays);

    for(let i = 0 ; i < this.lastDay.getDate() + surplusDays ; i++) {
      this.state.push(new Date(calendarDay));
      calendarDay.setDate(calendarDay.getDate()+1);
    }

    //this.state.map( item => {
    //  console.log(item);
    //})
  }

  
  previous() {
    this.state = [];
    this.viewDate.setMonth(this.viewDate.getMonth()-1);
    this.displayMonth = this.months[this.viewDate.getMonth()];

    this.firstDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
    this.lastDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0);
    //this.newDate.setMonth(this.viewDate.getMonth()-1);
    this.startDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(),  (this.firstDay.getDate())-this.correctWeekIndex(this.firstDay));
    
    let calendarDay = this.startDay;
    let surplusDays = (+this.firstDay - +this.startDay) / (1000 * 60 * 60 * 24);
    console.log(surplusDays);

    for(let i = 0 ; i < this.lastDay.getDate() + surplusDays ; i++) {
      this.state.push(new Date(calendarDay));
      calendarDay.setDate(calendarDay.getDate()+1);
    }

    // this.state.map( item => {
    //   console.log(item);
    // })
  }

  private correctWeekIndex(date: Date): number {
    return (date.getDay() + 6)%7;
  }

}
