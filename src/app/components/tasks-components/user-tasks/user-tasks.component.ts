import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit, OnDestroy {

  // TODO one sub?
  userData!: any;
  authUser!: any;
  authStateSubscription!: Subscription;
  userSubscription!: Subscription;
  newTaskSubscription!: Subscription;
  taskBodyMaxLength: number = 300;
  
  userTasks: object[] = [];
  taskBody!: string;

  constructor(
    private authService: AuthService,
    private fireService: FirestoreService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.subscribeAuthState();
  }

  ngOnDestroy(): void {
    if (this.authStateSubscription) this.authStateSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.newTaskSubscription) this.newTaskSubscription.unsubscribe();
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
  
  updateTasks() {
    this.fireService.update({userTasks:this.userData.userTasks}, this.authUser.uid, 'users');
  }

  removeTask(index: number) {
    this.userData.userTasks.splice(index, 1);
    this.updateTasks();
  }

  editTask(index: number) {

  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogAddTaskComponent);
    
    dialogRef.componentInstance.bodyMaxLength = this.taskBodyMaxLength;
    this.newTaskSubscription = dialogRef.afterClosed()
      .subscribe( (result) => {
        if (result) {
          this.userData.userTasks.push(result);
          this.updateTasks();
        }
      });
    
  }

}
