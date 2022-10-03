import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';
import { UserTask } from 'src/models/user-task.class';
import { DialogEditTaskComponent } from '../dialog-edit-task/dialog-edit-task.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input() task!: UserTask; // issue? prop is bound and value automatically updates card when writing in edit form?
  @Input() index!: number;

  @Output() deleteTask = new EventEmitter<[number, UserTask]>();
  @Output() editTask = new EventEmitter<[number, UserTask]>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  emitDeleteEvent() {
    this.deleteTask.emit([this.index, this.task]);
  }

  emitEditEvent() {
    this.editTask.emit([this.index, this.task]);
  }

}
