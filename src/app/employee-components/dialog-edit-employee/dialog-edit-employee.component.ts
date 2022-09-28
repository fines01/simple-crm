import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Employee } from 'src/models/employee.class';

@Component({
  selector: 'app-dialog-edit-employee',
  templateUrl: './dialog-edit-employee.component.html',
  styleUrls: ['./dialog-edit-employee.component.scss']
})
export class DialogEditEmployeeComponent implements OnInit {

  // TODO edit birthday and department (etc?) (and show dep.: in header-card)

  employee!: Employee;
  employeeID!: string;
  loading = false;
  birthDate!: Date;
  companyDepartments!: string[];
  minBirthDate!: Date;

  constructor(
    private dialogRef: MatDialogRef<DialogEditEmployeeComponent>, 
    private dialog: MatDialog,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {
    let date = new FormControl(new Date(this.employee.birthDate)).value; // FormControl necessary? or instead just new Date(...)?
    if (date instanceof Date) this.birthDate = date;
    if (this.employee) this.companyDepartments = this.employee.departments;
    this.setMinBirthdate();
  }

   setMinBirthdate(){
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let currentDay = new Date().getDate(); // toISOString() & 1. split ab T, 2. split at -
    this.minBirthDate = new Date(currentYear - 16, currentMonth, currentDay); // currentYear & current Month (1st) - 16 years as minimum age of employee
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getRandomColor() {
    this.employee.colorCode = this.employee.randomHexColor();
  }

  saveEdit() {
    this.loading = true;
    this.employee.birthDate = this.birthDate.getTime();
    // firestire: save via service
    this.fireService.update(this.employee.toJSON(), this.employeeID ,'employees')
      .then( (res)=>{
        this.afterSaveSuccess();
        console.info('%c SUCCESS updating employee ', 'color: white; background: #333399');
      })
      .catch( (err) => console.warn('%c ERROR updating employee: '+err, 'color: blue'))
  }

  afterSaveSuccess(){
    this.loading = false;
    this.closeDialog();
  }

  afterSaveError() {}

}
