import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Project } from 'src/models/project.class';

@Component({
  selector: 'app-dialog-edit-project',
  templateUrl: './dialog-edit-project.component.html',
  styleUrls: ['./dialog-edit-project.component.scss']
})
export class DialogEditProjectComponent implements OnInit {

  project!: Project;
  projectID!: string;
  loading = false;
  dueDate!: Date;
  employees!: any[];
  manager!: any;
  managerID!: string;

  constructor(
    private dialogRef: MatDialogRef<DialogEditProjectComponent>, 
    private dialog: MatDialog,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {
    let date = new FormControl(new Date(this.project.dueDate)).value; // FormControl necessary? or instead just new Date(...)?
    if(date instanceof Date) this.dueDate = date;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveEdit() {
    this.loading = true;
    this.managerID = this.manager.objID;
    this.project.managerID = this.manager.objID;
    this.fireService.update(this.project, this.projectID ,'projects')
      .then( ()=>{
        this.afterSaveSuccess();
      });
  }

  afterSaveSuccess(){
    this.loading = false;
    this.closeDialog();
  }

  afterSaveError() {}
}
