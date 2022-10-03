import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { FirestoreService } from '../../../services/firestore.service';
import { DialogEditTaskComponent } from '../dialog-edit-task/dialog-edit-task.component';
//import { Task } from 'src/app/interfaces/task.interface';
import { UserTask } from 'src/models/user-task.class';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit, OnDestroy {

  userData!: any;
  authUser!: any;

  authStateSubscription!: Subscription;
  userSubscription!: Subscription;
  newTaskSubscription!: Subscription;
  updatedTaskSubscription!: Subscription;
  
  // userTasks: object[] = [];
  // filteredTasks: object[] = this.userTasks;
  //taskBody!: string;

  taskObj = new UserTask();
  taskCategories = this.taskObj.taskCategories;
  urgencyOptions = this.taskObj.urgencyOptions;
  imprtanceOptions = this.taskObj.importanceOptions;
  
  selectedCategory!: string;
  selectedUrgency!: string;
  selectedImportance!: string;
  filteredTasks!: object[];

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

  onFilterCategory(category: string) {
    this.selectedCategory = category;
    this.filterTasks();
  }

  filterTasks() {
    if (this.selectedCategory) {
      this.filteredTasks = this.userData.userTasks.filter( (task:any)=> task.category === this.selectedCategory);
      console.log(this.filteredTasks)
    }
    else this.filteredTasks = this.userData.userTasks;
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
        if (this.userData) this.filterTasks();
      });
  }
  
  updateTasks() {
    this.fireService.update({userTasks:this.userData.userTasks}, this.authUser.uid, 'users');
  }

  
  addTaskDialog() {
    let dialogRef = this.dialog.open(DialogAddTaskComponent);
    
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

  onEditTask(event: [number, UserTask]) {
    let [index, task] = event;

    let dialogRef = this.dialog.open(DialogEditTaskComponent);
    dialogRef.componentInstance.targetTask = new UserTask(task);

    this.updatedTaskSubscription = dialogRef.afterClosed()
      .subscribe( (result) => {
        if (result) {
          this.userData.userTasks[index] = result;
          this.updateTasks();
        }
      });
  }
  

}
