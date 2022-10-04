import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';
import { UserTask } from 'src/models/user-task.class';
import { strCounter } from 'src/utils/str-counter';

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss']
})
export class DialogEditTaskComponent implements OnInit {

  loading = false;
  
  targetTask!: UserTask;
  bodyLength!: number;
  bodyCharacterCounter!: number;
  urgencyOptions!: string[]; 
  importanceOptions!: string[]; 
  taskCategories!: string[]; 
  
  constructor(private dialogRef: MatDialogRef<DialogEditTaskComponent>) { }

  ngOnInit(): void {
    this.urgencyOptions = this.targetTask.urgencyOptions;
    this.importanceOptions = this.targetTask.importanceOptions;
    this.taskCategories = this.targetTask.taskCategories;
  }

  counter(): void {
    [this.bodyLength, this.bodyCharacterCounter] = strCounter(this.targetTask.body, this.targetTask.maxBodyLength);
  }

  setTaskData() {
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
