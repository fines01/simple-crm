import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserTask } from 'src/app/interfaces/user-task.interface';
import { DialogEditTaskComponent } from '../dialog-edit-task/dialog-edit-task.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input() task!: UserTask; // issue? prop is bound and value automatically updates card when writing in edit form?
  @Input() index!: number;

  @Output() deleteTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<[number, UserTask]>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  emitDeleteEvent() {
    this.deleteTask.emit(this.index);
  }

  emitEditEvent() {
    this.editTask.emit([this.index, this.task]);
  }

}