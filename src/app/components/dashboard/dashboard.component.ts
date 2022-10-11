import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { DialogEditUserAvatarComponent } from '../dialog-edit-user-avatar/dialog-edit-user-avatar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  @ViewChildren('seconds') secondsHand!:QueryList<HTMLDivElement>; // using ngIf in template results my ViewChild to return undefined
  @ViewChildren('minutes') minuteHand!: HTMLDivElement[];
  @ViewChildren('hours') hourHand!: HTMLDivElement[];
  
  userData!: any;
  authUser!: any;
  userID!: string;

  localeDateString!: string;
  currentHour!: number;
  currentMinute!: number;
  currentSecond!: number;
  // months = ['Jan', 'Feb',...]
  doneTasks!: any;
  unemployedEmployees!: any;

  secAnimationDelay!: string;
  minAnimationDelay!: string;
  hourAnimationDelay!: string;

  authStateSubscription!: Subscription;
  userSubscription!: Subscription;


 
  constructor(
    private authService: AuthService,
    private fireService: FirestoreService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscribeAuthState();
    let now = new Date();
    this.setClock(now);
    this.runTimer(now);
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
        if (this.userData) this.getDoneTasks();
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

  getDoneTasks() {
    this.doneTasks = this.userData.userTasks.filter( (task: any)=> task.category === 'Done' )
  }

  // clock
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

  getTasksProgress(): number {
    if (this.doneTasks.length === 0) return 0;
    let perc = Math.round(this.doneTasks.length * (100/this.userData.userTasks.length))
    return perc;
  }

  openEditProfilePic() {
    let editDialog: MatDialogRef<DialogEditUserAvatarComponent> = this.dialog.open(DialogEditUserAvatarComponent);
    editDialog.componentInstance.user = this.userData;
  }

  


}
