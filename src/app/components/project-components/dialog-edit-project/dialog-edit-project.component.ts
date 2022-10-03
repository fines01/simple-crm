import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Project } from 'src/models/project.class';

@Component({
  selector: 'app-dialog-edit-project',
  templateUrl: './dialog-edit-project.component.html',
  styleUrls: ['./dialog-edit-project.component.scss']
})
export class DialogEditProjectComponent implements OnInit, AfterViewInit {

  loading = false;
  project!: Project;
  projectID!: string;
  dueDate!: Date;
  employees!: any[];
  managerID!: string;
  descriptionCounter!: number;
  descriptionLength!: number;
  descriptionMaxLength!: number;
  minDuedate!: Date;
  dueDateExpired!: boolean;

  @ViewChild('dateInputElement') dateInput!: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<DialogEditProjectComponent>, 
    private dialog: MatDialog,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {
    let date = new FormControl(new Date(this.project.dueDate)).value; // FormControl necessary? or instead just new Date(...)?
    if(date instanceof Date) this.dueDate = date;
    this.descriptionMaxLength = this.project.descriptionMaxLength;
    this.countStrLength();
    this.minDuedate = this.setMinDate();
  }
  
  ngAfterViewInit(): void {
    setTimeout( ()=> {
      if (this.dueDateExpired) this.dateInput.nativeElement.click();
    });
  }

   setMinDate(): Date {
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  countStrLength(): void {
    this.descriptionLength = this.project.description.length;
    this.descriptionCounter = this.descriptionMaxLength - this.project.description.length;
  }

  saveEdit(): void {
    this.loading = true;
    this.project.managerID = this.managerID;// this.manager.objID;
    this.project.dueDate = this.dueDate.getTime();
    this.fireService.update(this.project.toJSON(), this.projectID ,'projects')
      .then( (res)=>{
        //console.info('%c SUCCESS updating project ', 'color: white; background: #333399');
        this.afterSaveSuccess();
      })
      .catch ( (err) => console.warn('%c ERROR updating employee: '+err, 'color: orange') )
      .finally (()=> console.info('%c Project update completed ', 'color: white; background: #333399'));
  }

  afterSaveSuccess(): void{
    this.loading = false;
    this.closeDialog();
  }

  afterSaveError() {}
}
