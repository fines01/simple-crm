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
  
  title!: string;
  body!: string;
  urgency!: string;
  importance!: string;
  category!: string;
  
  bodyMaxLength!: number;;
  bodyLength!: number;
  bodyCharacterCounter!: number;

  // where to put those: maybe into user.tasks (as parent)
  urgencyOptions: string[] = ['urgent', 'not urgent'];
  importanceOptions: string[] = ['important', 'not important']
  //eisenhowerMatrixOptions: string[] = ['Do now','Delegate','Do later','Ignore']; //
  taskCategories: string[] = ['To Do (Backlog)','Do Next','In Progress', 'Testing', 'Done']

  constructor(
    private dialogRef: MatDialogRef<DialogAddTaskComponent>,
  ) { }

  ngOnInit(): void {
    this.category = this.taskCategories[0];
    this.urgency = this.urgencyOptions[1];
    this.importance = this.importanceOptions[1];
  }

  // maybe put into a util file (needed also in other components like: tasks: task body)
  countStrLength() {
    //this.bodyLength = this.project.description.length;
    this.bodyCharacterCounter = this.bodyMaxLength - this.body.length;
  }

  setTaskData() {
    const task: UserTask = {
      title: this.title,
      body: this.body ? this.body : '', // body can be empty
      urgency: this.urgency,
      importance: this.importance,
      category: this.category,
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
