import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, AfterViewInit {

  secAnimationDelay!: string;
  minAnimationDelay!: string;
  hourAnimationDelay!: string;

  @ViewChildren('clock') private clockRef!: QueryList<ElementRef>
  @Input() clockSize!: number;

  constructor() { }

  ngOnInit(): void {
    let now = new Date();
    this.setClock(now);
  }
  
  ngAfterViewInit(): void {
     // i could also just pass [style.--clockSize]="val" in the html template
    this.clockRef.toArray()[0].nativeElement.style.setProperty('--clock-size', this.clockSize + 'px');
      
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
