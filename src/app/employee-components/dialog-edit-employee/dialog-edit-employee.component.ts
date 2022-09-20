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

  employee!: Employee;
  employeeID!: string;
  loading = false;
  birthDate!: Date;

  constructor(
    private dialogRef: MatDialogRef<DialogEditEmployeeComponent>, 
    private dialog: MatDialog,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {
    let date = new FormControl(new Date(this.employee.birthDate)).value; // FormControl necessary? or instead just new Date(...)?
    if(date instanceof Date) this.birthDate = date;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getRandomColor() {
    this.employee.colorCode = this.employee.randomHexColor();
  }

  saveEdit() {
    this.loading = true;
    // firestire: save via service
    this.fireService.update(this.employee.toJSON(), this.employeeID ,'employees')
      .then( ()=>{
        this.afterSaveSuccess(); // todo: add some checks
      });
  }

  afterSaveSuccess(){
    this.loading = false;
    // ... etc.
    this.closeDialog();
  }

  afterSaveError() {}

}
