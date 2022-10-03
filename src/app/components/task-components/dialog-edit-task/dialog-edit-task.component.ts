import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';
import { UserTask } from 'src/models/user-task.class';

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss']
})
export class DialogEditTaskComponent implements OnInit {

  loading = false;
  
  targetTask!: UserTask;

  bodyMaxLength!: number;;
  bodyLength!: number;
  bodyCharacterCounter!: number;
  urgencyOptions!: string[]; // = ['urgent', 'not urgent'];
  importanceOptions!: string[]; // = ['important', 'not important']
  taskCategories!: string[]; // = ['To Do (Backlog)','Do Next','In Progress', 'Testing', 'Done'];
  
  constructor(private dialogRef: MatDialogRef<DialogEditTaskComponent>) { }

  ngOnInit(): void {
    this.bodyMaxLength = this.targetTask.maxBodyLength;
    this.urgencyOptions = this.targetTask.urgencyOptions;
    this.importanceOptions = this.targetTask.importanceOptions;
    this.taskCategories = this.targetTask.taskCategories;
  }

  countStrLength() {
    this.bodyCharacterCounter = this.bodyMaxLength - this.targetTask.body.length;
  }

  setTaskData() {
    // const task: Task = {
    //   title: this.targetTask.title,
    //   body: this.targetTask.body ? this.targetTask.body : '', // body can be empty
    //   urgency: this.targetTask.urgency,
    //   importance: this.targetTask.importance,
    //   category: this.targetTask.category,
    //   //bodyMaxLength: this.bodyMaxLength,
    // }
    // return task;
    return this.targetTask.toJSON();
  }

  closeDialog(data?:Task) { // UserTask | undefined
    this.dialogRef.close(data);
  }

  updateTask(){
    const updatedTask = this.setTaskData();
    this.closeDialog(updatedTask);
  }

}
