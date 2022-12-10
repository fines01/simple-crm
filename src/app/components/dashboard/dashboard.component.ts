import { Component, DoCheck, OnChanges, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { DialogEditUserAvatarComponent } from '../user-components/dialog-edit-user-avatar/dialog-edit-user-avatar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, DoCheck, OnDestroy {

  @ViewChildren('seconds') secondsHand!:QueryList<HTMLDivElement>; // using ngIf in template results my ViewChild to return undefined
  @ViewChildren('minutes') minuteHand!: HTMLDivElement[];
  @ViewChildren('hours') hourHand!: HTMLDivElement[];
  
  userData!: any;
  authUser!: any;
  userID!: string;

  localeDateString!: string;
  localeTimeString!: string;

  currentHour!: number;
  currentMinute!: number;
  currentSecond!: number;
  // months = ['Jan', 'Feb',...]
  doneTasks!: any;
  unassignedEmployees!: any;
  initialAmountNotifications!: number;
  userMessages!: any[];

  secAnimationDelay!: string;
  minAnimationDelay!: string;
  hourAnimationDelay!: string;

  authStateSubscription!: Subscription;
  userSubscription!: Subscription;
  unassignedSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private fireService: FirestoreService,
    private dialog: MatDialog,
    private dataService: DataService,
    // private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscribeAuthState();
    let now = new Date();
    this.runTimer(now);
    this.subscribeUnassignedEmployees();
    this.setInitialNotificationsAmount();
  }

  ngOnDestroy(): void {
    if (this.authStateSubscription) this.authStateSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.unassignedSubscription) this.unassignedSubscription.unsubscribe();
  }

  ngDoCheck(): void {
    // this.initialAmountNotifications = this.unassignedEmployees.length;
    // this.getNotoficationsProgress();
  }

  subscribeUnassignedEmployees() {
    this.unassignedSubscription = this.dataService.unassigned$.subscribe( response => {
      if (response) this.unassignedEmployees = response;
      else this.unassignedEmployees = [];
    });
  }

  subscribeAuthState() {
    this.authStateSubscription = this.authService.getAuthState()
      .subscribe( (user) => {
        if (user) this.authUser = user;
        if (this.authUser) this.subscribeUser()
        else this.userSubscription.unsubscribe();
      });
  }
    
  subscribeUser() {
    this.userSubscription = this.fireService.getByID(this.authUser.uid, 'users')
      .subscribe( (user)=> {
        if (user) this.userData = user;
        if (this.userData) this.getDoneTasks();
        // if (!user) this.userSubscription.unsubscribe();
      });
  }

  runTimer(now: Date) {
    let options: any = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    // console.log( now.toLocaleDateString(undefined, options))
    setInterval( ()=> {
      let date = now.toLocaleDateString(undefined, options).split(' ');
      this.localeDateString = date[0].replace(',','');
      this.localeTimeString = date[1].replaceAll(':',' : ');
      now = new Date();
      //this.setClock(now)
    }, 1000)
  }

  getDoneTasks() {
    this.doneTasks = this.userData.userTasks.filter( (task: any)=> task.category === 'Done' )
  }

  getTasksProgress(): number {
    if (this.doneTasks.length === 0) return 0;
    let percentage = Math.round(this.doneTasks.length * (100/this.userData.userTasks.length));
    return percentage;
  }

  // getNotoficationsProgress(): number {
  //   let amountNotifications = this.unassignedEmployees.length;
  //   if (amountNotifications > this.initialAmountNotifications) this.initialAmountNotifications = amountNotifications;
  //   let doneNotifications = this.initialAmountNotifications - amountNotifications;
  //   let percentage = Math.round(doneNotifications * (100 / amountNotifications) );
  //   return percentage;
  // }

  setInitialNotificationsAmount() {
    if(this.unassignedEmployees) this.initialAmountNotifications = this.unassignedEmployees.length; // wait until received (while ! run again?)
    else this.setInitialNotificationsAmount();
  }

  openEditProfilePicture() {
    let editDialog: MatDialogRef<DialogEditUserAvatarComponent> = this.dialog.open(DialogEditUserAvatarComponent);
    editDialog.componentInstance.user = this.userData;
  }


}
