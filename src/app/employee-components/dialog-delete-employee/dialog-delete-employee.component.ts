import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/firestore.service';
import { Employee } from 'src/models/employee.class';

@Component({
  selector: 'app-dialog-delete-employee',
  templateUrl: './dialog-delete-employee.component.html',
  styleUrls: ['./dialog-delete-employee.component.scss']
})
export class DialogDeleteEmployeeComponent implements OnInit {

  loading = false;
  showSuccessMsg = false;
  employee!: Employee;
  employeeID!: string;

  dialogTitle = 'Delete Employee?';
  dialogMessage = 'Do you really want to delete the employee: ';

  constructor(
    private dialogRef: MatDialogRef<DialogDeleteEmployeeComponent>,
    private fireService: FirestoreService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeDelete() {
    setTimeout(()=> {
      //this.router.navigate(['/clients']); // instead --> checkRouteExists() in employee-detail
      this.closeDialog()
    },2500);
  }

  deleteClient() {
    this.loading = true;
    this.fireService.delete(this.employeeID, 'employees')
      .then( (result: any)=>{
        this.loading = false;
        this.setSuccessDialog();
        this.closeDelete();
      });
  }

  setSuccessDialog() {
    this.dialogTitle = 'Success!';
    this.dialogMessage = 'Deleted employee:';
    this.showSuccessMsg = true;
  }

}
