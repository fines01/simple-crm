import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Employee } from 'src/models/employee.class';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-dialog-add-employee',
  templateUrl: './dialog-add-employee.component.html',
  styleUrls: ['./dialog-add-employee.component.scss']
})
export class DialogAddEmployeeComponent implements OnInit {

  employee = new Employee();
  birthDate!: Date; // from date-picker input, convert into timestamp
  loading = false;
  countries!: string[];
  companyDepartments = this.employee.departments;

  constructor( 
    private dialogRef: MatDialogRef<DialogAddEmployeeComponent>,
    private fireService: FirestoreService
  ) { }

  ngOnInit(): void {
    this.countries = this.employee.countries;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveEmployee() {
    this.loading = true;
    this.employee.birthDate = this.birthDate.getTime();
    this.employee.colorCode = this.employee.randomHexColor();
    this.fireService.add(this.employee.toJSON(), 'employees')
      .then( (result: any) => {
        this.loading = false;
        this.closeDialog();
      });
  }

}
