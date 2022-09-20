import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Employee } from 'src/models/employee.class';

@Component({
  selector: 'app-dialog-edit-employee-address',
  templateUrl: './dialog-edit-employee-address.component.html',
  styleUrls: ['./dialog-edit-employee-address.component.scss']
})
export class DialogEditEmployeeAddressComponent implements OnInit {

  employee!: Employee;
  employeeID!: string;
  loading = false;
  countries!: string[];
    
  constructor(
    private dialogRef: MatDialogRef<DialogEditEmployeeAddressComponent>, 
    private dialog: MatDialog,
    private fireService: FirestoreService,
    ) { }

  ngOnInit(): void {
    this.countries = this.employee.countries;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveEdit() {
    this.loading = true;
    this.fireService.update(this.employee.toJSON(), this.employeeID, 'employees')
      .then(()=>{ 
        this.loading = false;
        this.closeDialog();
      });
  }

}
