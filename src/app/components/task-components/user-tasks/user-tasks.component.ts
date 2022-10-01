import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { FirestoreService } from '../../../services/firestore.service';
import { DialogEditTaskComponent } from '../dialog-edit-task/dialog-edit-task.component';
import { UserTask } from 'src/app/interfaces/user-task.interface';

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
  updatedTaskSubscription!: Subscription;

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
    if (this.updatedTaskSubscription) this.updatedTaskSubscription.unsubscribe();
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

  
  addTaskDialog() {
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
  
  onDeleteTask(index:number) {
    this.userData.userTasks.splice(index, 1);
    this.updateTasks();
  }

  onEditTask(event: [number, UserTask]) { //TODO: maybe passing task is not necessary --> this.userData.userTasks[index]; 
    let [index, task] = event;

    let dialogRef = this.dialog.open(DialogEditTaskComponent);
    dialogRef.componentInstance.targetTask = task;
    //somehow bound to prop i send into app-card (when working on edit the cards get updated as well w.o. saving, only in view & not db)

    this.updatedTaskSubscription = dialogRef.afterClosed()
      .subscribe( (result) => {
        if (result) {
          console.log( 'updated task: ', result)
          this.userData.userTasks[index] = result;
          this.updateTasks();
        }
      });
  }
  

}
