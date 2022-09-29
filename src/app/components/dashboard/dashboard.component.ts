import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userData!: any;
  authUser!: any;
  userID!: string;

  authStateSubscription!: Subscription;
  userSubscription!: Subscription;

  //TODO move
  userTasks: object[] = [];
  taskBody!: string;

  constructor(
    private authService: AuthService,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {
    this.subscribeAuthState();
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

  // signOut() {
  //   this.authService.signOut()
  // }

  //move to user tasks 
  addTask() {
    let task = {
      // title: this.taskTitle,
      body: this.taskBody,
    }
    //add task
    //this.fireService.addUserTask(this.userData.uid, task);
    this.userData.userTasks.push(task);
    this.updateTasks()
  }
  
  updateTasks() {
    this.fireService.update({userTasks:this.userData.userTasks}, this.authUser.uid, 'users');
  }

  removeTask(index: number) {
    this.userData.userTasks.splice(index, 1);
    this.updateTasks();
  }

}
