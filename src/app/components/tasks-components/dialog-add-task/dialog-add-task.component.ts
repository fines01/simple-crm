import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserTask } from 'src/app/interfaces/user-task.interface';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent implements OnInit {


  loading: boolean = false;
  
  taskTitle!: string;
  taskBody!: string;
  taskUrgency!: string;
  taskImportance!: string;
  taskCategory!: string;
  
  bodyMaxLength!: number;;
  bodyLength!: number;
  bodyCharacterCounter!: number;

  // where to put those: maybe into user.tasks (as parent)
  urgencyOptions: string[] = ['urgent', 'not urgent'];
  importanceOptions: string[] = ['important', 'not important']
  eisenhowerMatrixOptions: string[] = ['Do now','Delegate','Do later','Ignore']; //
  taskCategories: string[] = ['To Do (Backlog)','Do Next','In Progress', 'Testing', 'Done']

  constructor(
    private dialogRef: MatDialogRef<DialogAddTaskComponent>,
  ) { }

  ngOnInit(): void {
    this.taskCategory = this.taskCategories[0];
  }

  // maybe put into a util file (needed also in other components like: tasks: task body)
  countStrLength() {
    //this.bodyLength = this.project.description.length;
    this.bodyCharacterCounter = this.bodyMaxLength - this.taskBody.length;
  }

  setTaskData() {
    const task: UserTask = {
      taskTitle: this.taskTitle,
      taskBody: this.taskBody,
      taskUrgency: this.taskUrgency,
      taskImportance: this.taskImportance,
      taskCategory: this.taskCategory,
      //bodyMaxLength: this.bodyMaxLength,
    }
    return task;
  }

  closeDialog(data?:any) {
    this.dialogRef.close(data);
  }

  addTask(){
    const newTask = this.setTaskData();
    this.closeDialog(newTask);
  }
}
