import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Employee } from 'src/models/employee.class';
import { FirestoreService } from 'src/app/services/firestore.service';

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
  minBirthDate!: Date;

  constructor( 
    private dialogRef: MatDialogRef<DialogAddEmployeeComponent>,
    private fireService: FirestoreService
  ) { }

  ngOnInit(): void {
    this.countries = this.employee.countries;
    this.setMinBirthdate();
  }
  
  setMinBirthdate(){
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let currentDay = new Date().getDate(); // toISOString() & 1. split ab T, 2. split at -
    this.minBirthDate = new Date(currentYear - 16, currentMonth, currentDay); // currentYear & current Month (1st) - 16 years as minimum age of employee
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
        console.info('%c SUCCESS adding employee', 'color: white; background: #333399');
      })
      .catch((err) => console.warn('%c ERROR adding employee: '+err, 'color: blue'));
  }

}
