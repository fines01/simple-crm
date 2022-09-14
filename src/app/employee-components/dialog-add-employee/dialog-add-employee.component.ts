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

  randomHexColor() {
    let hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let hexColorStr = '#';
    for (let i = 0; i < 6; i++) {
        let randNr = Math.floor(Math.random() * hex.length); //random number between [0, hex.length[
        hexColorStr += hex[randNr];
    }
    return hexColorStr;
}

  saveEmployee() {
    this.loading = true;
    this.employee.birthDate = this.birthDate.getTime();
    this.employee.colorCode = this.randomHexColor();
    this.fireService.add(this.employee.toJSON(), 'employees')
      .then( (result: any) => {
        this.loading = false;
        this.closeDialog();
      });
  }

}
