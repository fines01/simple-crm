import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Project } from 'src/models/project.class';
import { strCounter } from 'src/utils/str-counter';

@Component({
  selector: 'app-dialog-add-project',
  templateUrl: './dialog-add-project.component.html',
  styleUrls: ['./dialog-add-project.component.scss']
})
export class DialogAddProjectComponent implements OnInit {

  project = new Project();
  employees!: any[];
  dueDate!: Date;
  loading = false;
  manager!: any;
  managerID!: string;
  projectID!: string;
  descriptionCounter!: number;
  descriptionLength!: number;
  descriptionMaxLength!: number;
  minDuedate!: Date;

  // access template reference variables 
  // @ViewChild('addProjectForm',{static:true}) addProjectForm!: ElementRef;
  // @ViewChild('name',{static:true}) nameInput!: ElementRef;

  constructor(
    private dialogRef: MatDialogRef < DialogAddProjectComponent > ,
    private fireService: FirestoreService,
  ) {}

  ngOnInit(): void {
    this.subscribeEmployees();
    this.descriptionMaxLength = this.project.descriptionMaxLength;
    this.minDuedate = this.setMinDate();
  }

  setMinDate() {
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  }

  //getErrorMessages() { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  counter(): void{
    [this.descriptionLength, this.descriptionCounter] = strCounter(this.project.description, this.descriptionMaxLength);
  }

  async saveProject() {
    this.loading = true;
    this.project.status = 'initialized';
    this.project.managerID = this.manager.objID ? this.manager.objID : '';
    this.project.dueDate = this.dueDate.getTime();
    //
    await this.fireService.add(this.project.toJSON(), 'projects')
      .then((result: any) => {
        console.info('%c SUCCESS adding new project. ', 'color: white; background: #333399');
        this.loading = false;
        this.closeDialog();
      })
      .catch((err) => console.warn('%c ERROR - adding new project failed: ' + err, 'color: blue'));
  }

  subscribeEmployees() {
    this.fireService.getCollection('employees', 'lastName')
      .subscribe(employees => {
        if (employees) this.employees = employees;
      });
  }

}
