import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { FirestoreService } from '../../../services/firestore.service';
import { DialogEditTaskComponent } from '../dialog-edit-task/dialog-edit-task.component';
//import { Task } from 'src/app/interfaces/task.interface';
import { UserTask } from 'src/models/user-task.class';
import { MatButtonToggle } from '@angular/material/button-toggle';

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
  importanceOptions = this.taskObj.importanceOptions;
  
  selectedCategory!: string | undefined;
  selectedUrgency!: string | undefined;
  selectedImportance!: string | undefined;
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

  onFilterCategory(category: string): void {
    this.selectedCategory = category;
    this.filterTasks();
  }

  onFilterUrgency(option: string, btn: MatButtonToggle): void {
    if(this.selectedUrgency === option)  {
      this.selectedUrgency = undefined;
      btn.checked = false;
    }
    else this.selectedUrgency = option;
    this.filterTasks();
  }

  onFilterImportance(option: string, btn: MatButtonToggle): void {
    if (this.selectedImportance === option) {
      this.selectedImportance = undefined;
      btn.checked = false;
    }
    else this.selectedImportance = option;
    this.filterTasks();
  }

  filterTasks(): void {
    if (this.selectedCategory || this.selectedUrgency || this.selectedImportance) {
      this.filteredTasks = this.userData.userTasks.filter( (task:any) => {
        return (
          ( (this.selectedUrgency && task.urgency === this.selectedUrgency) || !this.selectedUrgency ) && 
          ( (this.selectedImportance && task.importance === this.selectedImportance) || !this.selectedImportance ) &&
          ( (this.selectedCategory && task.category === this.selectedCategory) || !this.selectedCategory)
        );
      });
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
        if (user) {
          this.userData = user;
          this.filterTasks();
        }
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
  
  onDeleteTask(event: [number, UserTask]) {
    let [index, task] = event;
    let dbIndex = this.userData.userTasks.indexOf(task); /// fix: if edited from filteredTasks array (using a unique ID would be better)
    console.log(index,dbIndex);

    this.userData.userTasks.splice(dbIndex, 1);
    this.updateTasks();
  }

  onEditTask(event: [number, UserTask]) {
    let [index, task] = event;

    let dbIndex = this.userData.userTasks.indexOf(task); /// fix: if edited from filteredTasks array (using a unique ID would be better)
    console.log(index,dbIndex)

    let dialogRef = this.dialog.open(DialogEditTaskComponent);
    dialogRef.componentInstance.targetTask = new UserTask(task);

    this.updatedTaskSubscription = dialogRef.afterClosed()
      .subscribe( (result) => {
        if (result) {
          this.userData.userTasks[dbIndex] = result;
          this.updateTasks();
          this.filterTasks();
        }
      });
  }
  

}
