import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { UserTask } from 'src/models/user-task.class';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent implements OnInit {

  @ViewChild('selectCategory', {static: false}) categorySelectRef!: MatSelect;

  loading: boolean = false;
  newTask = new UserTask();

  bodyLength!: number;
  bodyCharacterCounter!: number;

  constructor(
    private dialogRef: MatDialogRef<DialogAddTaskComponent>,
  ) { }

  ngOnInit(): void {
  }

  countStrLength() {
    this.bodyCharacterCounter = this.newTask.maxBodyLength - this.newTask.body.length;
  }

  setTaskData() {
    return this.newTask.toJSON();
  }

  closeDialog(data?:any) {
    this.dialogRef.close(data);
  }

  focusCategoryIpt() {
    //console.log(this.categorySelectRef)
    this.categorySelectRef._elementRef.nativeElement.focus();
  }

  addTask(){
    this.loading = true;
    const task = this.newTask.toJSON();
    this.closeDialog(task);
  }


}
