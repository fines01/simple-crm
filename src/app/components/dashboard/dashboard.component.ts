import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('seconds') secondsHand!:QueryList<HTMLDivElement>; // using ngIf in template results my ViewChild to return undefined
  @ViewChildren('minutes') minuteHand!: HTMLDivElement[];
  @ViewChildren('hours') hourHand!: HTMLDivElement[];
  
  userData!: any;
  authUser!: any;
  userID!: string;

  localeDateString!: string;

  currentYear!: number;
  currentMonthIndex!: number;
  currentDay!: number;
  currentHour!: number;
  currentMinute!: number;
  currentSecond!: number;
  // months = ['Jan', 'Feb',...]

  secAnimationDelay!: string;
  minAnimationDelay!: string;
  hourAnimationDelay!: string;

  authStateSubscription!: Subscription;
  userSubscription!: Subscription;


 
  constructor(
    private authService: AuthService,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {
    this.subscribeAuthState();
    let now = new Date();
    this.setClock(now);
    this.runTimer(now);
  }
  
  ngAfterViewInit() {
   
  }

  ngOnDestroy(): void {
    if (this.authStateSubscription) this.authStateSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  subscribeAuthState() {
    this.authStateSubscription = this.authService.getAuthState()
      .subscribe( (user) => {
        if (user) this.authUser = user;
        if (this.authUser) this.subscribeUser();
      });
    }
    
  subscribeUser() {
    this.userSubscription = this.fireService.getByID(this.authUser.uid, 'users')
      .subscribe( (user)=> {
        if (user) this.userData = user;
        // if (this.user) this.userTasks = this.user.userTasks
      });
  }

  runTimer(now: Date) {
    setInterval( ()=> {
      this.localeDateString = now.toLocaleDateString();
      this.currentHour = now.getHours();
      this.currentMinute = now.getMinutes();
      this.currentSecond = now.getSeconds();
      now = new Date();
      //this.setClock(now)
    }, 1000)
  }


  // clock
  setClock(now: Date) {
    //let now = new Date();
    let currentYear, currentMonthIndex, currentDay;
    [currentYear, currentMonthIndex, currentDay] = [now.getFullYear(), now.getMonth(), now.getDate()];
    let currentDayStart =  new Date(currentYear, currentMonthIndex, currentDay);
    
    let secondsToday = Math.round((+now - +currentDayStart) / 1000) + 2; // adding 1 sec bec delay (get delay)

    let seconds = ((secondsToday / 60) % 1) * 60;
    let minutes = ((secondsToday / 3600) % 1) * 3600;
    let hours = ((secondsToday / 43200) %1) * 43200;

    this.hourAnimationDelay = hours * -1 + 's';
    this.minAnimationDelay = minutes * -1 + 's';
    this.secAnimationDelay = seconds * -1 + 's';

    console.log(secondsToday, this.hourAnimationDelay, this.minAnimationDelay, this.secAnimationDelay)

  // or (ab diff css --> transform: rotate(0) in jew handles):
  //   ...style.transform = `rotate(${hour}deg)` // document.getElementById("hour").style.transform = 'rotate(' + hour + 'deg)';
  
  }

  


}
