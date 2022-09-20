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

  loading = false;
  project!: Project;
  projectID!: string;
  dueDate!: Date;
  employees!: any[];
  managerID!: string;

  constructor(
    private dialogRef: MatDialogRef<DialogEditProjectComponent>, 
    private dialog: MatDialog,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {
    let date = new FormControl(new Date(this.project.dueDate)).value; // FormControl necessary? or instead just new Date(...)?
    if(date instanceof Date) this.dueDate = date;
    //this.manager.objID = this.managerID;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveEdit() {
    this.loading = true;
    this.project.managerID = this.managerID;// this.manager.objID;
    this.fireService.update(this.project.toJSON(), this.projectID ,'projects')
      .then( ()=>{
        this.afterSaveSuccess();
      })
      .catch ( (err) => console.warn(err) )
      .finally (()=> console.info('%c Project update completed ', 'color: white; background: #333399')); // test: use custom css in console message
  }

  afterSaveSuccess(){
    this.loading = false;
    this.closeDialog();
  }

  afterSaveError() {}
}
