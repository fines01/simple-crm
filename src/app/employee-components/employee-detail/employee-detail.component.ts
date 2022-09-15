import { ComponentType } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/firestore.service';
import { Employee } from 'src/models/employee.class';
import { DialogDeleteEmployeeComponent } from '../dialog-delete-employee/dialog-delete-employee.component';
import { DialogEditEmployeeAddressComponent } from '../dialog-edit-employee-address/dialog-edit-employee-address.component';
import { DialogEditEmployeeComponent } from '../dialog-edit-employee/dialog-edit-employee.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  employeeID!: string;
  employee = new Employee();

  constructor(
    private route: ActivatedRoute,
    private fireService: FirestoreService,
    private dialog: MatDialog,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      let id = paramMap.get('id');
      if (typeof id == 'string') this.employeeID = id;
      console.log( 'git ID: ', id, this.employeeID);
      this.subscribeReceivedEmployee();
    });
  }

  subscribeReceivedEmployee() {
    this.fireService.getByID(this.employeeID, 'employees')
      .subscribe((employee: any) => {
         if (!this.checkRouteExists(employee)) return;
        this.employee = new Employee(employee); // convert JSON iton Objekt
        console.log('retreived employee: ', employee);
      });
  }

  //wh
  openDialog(dialogComponent: ComponentType<any>) {
    const dialog: MatDialogRef<any> = this.dialog.open(dialogComponent);
    this.passEditData(dialog);
  }

  passEditData(dialog: MatDialogRef<any>){
    // pass a copy(!) of the current user object to the dialog component: else every typed change in the text field will be saved immediately into original (two-way-binding)
    dialog.componentInstance.employee = new Employee(this.employee.toJSON());
    dialog.componentInstance.employeeID = this.employeeID;
  }

  openEditHeader() {
    this.openDialog(DialogEditEmployeeComponent);
  }

  openEditAddress() {
    this.openDialog(DialogEditEmployeeAddressComponent);
  }

  openEditInfo() {}

  openDeleteDialog() {
    this.openDialog(DialogDeleteEmployeeComponent);
  }

  // auslagern:
  checkRouteExists(client: any){
    if (client === undefined) {
      this.router.navigate(['/clients']);
      return false;
    }
    return true;
  }

}
