import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserTask } from 'src/app/interfaces/user-task.interface';

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss']
})
export class DialogEditTaskComponent implements OnInit {

  loading = false;
  targetTask!: UserTask;

  // //WH (char counter)
  bodyMaxLength!: number;;
  bodyLength!: number;
  bodyCharacterCounter!: number;
  // wH task related options
  urgencyOptions: string[] = ['urgent', 'not urgent'];
  importanceOptions: string[] = ['important', 'not important']
  //eisenhowerMatrixOptions: string[] = ['Do now','Delegate','Do later','Ignore']; 
  taskCategories: string[] = ['To Do (Backlog)','Do Next','In Progress', 'Testing', 'Done'];
  // // END WH

  constructor(private dialogRef: MatDialogRef<DialogEditTaskComponent>) { }

  ngOnInit(): void {
  }

  countStrLength() {
    this.bodyCharacterCounter = this.bodyMaxLength - this.targetTask.body.length;
  }

  setTaskData() {
    const task: UserTask = {
      title: this.targetTask.title,
      body: this.targetTask.body ? this.targetTask.body : '', // body can be empty
      urgency: this.targetTask.urgency,
      importance: this.targetTask.importance,
      category: this.targetTask.category,
      //bodyMaxLength: this.bodyMaxLength,
    }
    return task;
  }

  closeDialog(data?:UserTask) { // UserTask | undefined
    this.dialogRef.close(data);
  }

  updateTask(){
    const updatedTask = this.setTaskData();
    this.closeDialog(updatedTask);
  }

}
