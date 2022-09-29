import { ComponentType } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Employee } from 'src/models/employee.class';
import { DialogDeleteEmployeeComponent } from '../dialog-delete-employee/dialog-delete-employee.component';
import { DialogEditEmployeeAddressComponent } from '../dialog-edit-employee-address/dialog-edit-employee-address.component';
import { DialogEditEmployeeComponent } from '../dialog-edit-employee/dialog-edit-employee.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {

  employeeID!: string;
  employee = new Employee();
  
  projects!: any[];
  assignedProjects!: any[];
  managedProjects!: any[];
  localFormatDate!: string;

  isAssigned = true;

  routeparamSubscription!: Subscription;
  employeeSubscription!: Subscription;
  projectsSubscription!: Subscription;
  junctionSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private fireService: FirestoreService,
    private dialog: MatDialog,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.routeparamSubscription = this.route.paramMap.subscribe( paramMap => {
      let id = paramMap.get('id');
      if (typeof id == 'string') this.employeeID = id;
    });
    this.subscribeReceivedEmployee();
    this.subscribeProjects();
    this.subscribeEmployeeProjectJunction();
  }

  ngOnDestroy(): void {
    if (this.routeparamSubscription) this.routeparamSubscription.unsubscribe();
    if (this.employeeSubscription) this.employeeSubscription.unsubscribe();
    if (this.projectsSubscription) this.projectsSubscription.unsubscribe();
    if (this.junctionSubscription) this.junctionSubscription.unsubscribe();
  }

  isEmployeeAssigned() {
      if (this.assignedProjects && this.managedProjects) {
        this.isAssigned = this.assignedProjects.length > 0 || this.managedProjects.length > 0;
    }
  }

  subscribeReceivedEmployee() {
    this.fireService.getByID(this.employeeID, 'employees')
      .subscribe((employee: any) => {
        if (!this.checkRouteExists(employee)) return;
        this.employee = new Employee(employee); // convert JSON iton Objekt
        this.localFormatDate = new Date(employee.birthDate).toLocaleDateString();
      });
  }

  subscribeProjects() {
    this.projectsSubscription = this.fireService.getCollection('projects', 'name')
      .subscribe ((result) => {
        if (result) this.projects = result;
        if (this.projects) this.getManagedProjects();
      });
  }

  subscribeEmployeeProjectJunction() {
    this.junctionSubscription = this.fireService.getByValue('employee_id',this.employeeID,'employee_project')
      .subscribe( (result) => {
        if (result) this.getAssignedProjects(result)
        this.isEmployeeAssigned();
      });

  }

  getAssignedProjects(junctionDocs: any) {
    let projIDs: string[];
    if (this.projects) {
      projIDs = junctionDocs.map( (doc: any) => doc.project_id);
      this.assignedProjects = this.projects.filter( p => projIDs.indexOf(p.objID) > -1);
    }
  }

  getManagedProjects() {
    this.managedProjects = this.projects.filter( (project)=>{
      return project.managerID === this.employeeID;
    });
  }

  //wh
  openDialog(dialogComponent: ComponentType<any>) {
    let dialog!: MatDialogRef<any>;
    return dialog = this.dialog.open(dialogComponent);
  }

  passEditDetailData(dialog: MatDialogRef<any>){
    // pass a copy(!) of the current user object to the dialog component: else every typed change in the text field will be saved immediately into original (two-way-binding)
    dialog.componentInstance.employee = new Employee(this.employee.toJSON());
    dialog.componentInstance.employeeID = this.employeeID;
  }

  openEditHeader() {
    let dialog = this.openDialog(DialogEditEmployeeComponent);
    this.passEditDetailData(dialog);
  }

  openEditAddress() {
    let dialog = this.openDialog(DialogEditEmployeeAddressComponent);
    this.passEditDetailData(dialog);
  }

  openEditInfo() {}

  openDeleteDialog() {
    let dialog = this.openDialog(DialogDeleteEmployeeComponent);
    this.passEditDetailData(dialog);
    dialog.componentInstance.assignedProjects = this.assignedProjects;
    dialog.componentInstance.managedProjects = this.managedProjects;
  }

  // auslagern:
  checkRouteExists(client: any){
    if (client === undefined) {
      this.router.navigate(['/employees']);
      return false;
    }
    return true;
  }

}
