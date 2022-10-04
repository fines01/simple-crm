import { DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Project } from 'src/models/project.class';
import { DialogDeleteProjectComponent } from '../dialog-delete-project/dialog-delete-project.component';
import { DialogEditProjectEmployeesComponent } from '../dialog-edit-project-employees/dialog-edit-project-employees.component';
import { DialogEditProjectComponent } from '../dialog-edit-project/dialog-edit-project.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  projectID!: string;
  project = new Project();
  employees!: any;
  assignedEmployeeIDs = new Set(); // Set Object: collection of unique values // nn glob?
  assignedEmployees: any[] = []; // project.employees;
  manager!: any;
  managerColorCode!: string; // color-code of employee who manages the project
  junctionTableDocs!: any[];
  localFormatDate!: string;
  //dueDateExpired!: boolean;
  
  projectSubscription!: Subscription;
  employeesSubscription!: Subscription;
  assigneesSubscription!: Subscription;
  managerSubscription!: Subscription;
  routeSubscription!: Subscription;
  allSubscriptions!: Subscription[];

  constructor(
    private route: ActivatedRoute,
    private fireService: FirestoreService,
    private dialog: MatDialog,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.subscribeRouteParams();
    this.subscribeEmployees();
    this.subscribeAssignedEmployees();
   
    this.allSubscriptions = [
      this.routeSubscription,
      this.projectSubscription, 
      this.employeesSubscription,
      this.assigneesSubscription, 
      this.managerSubscription
    ];

  }

  ngOnDestroy(): void {
    this.allSubscriptions.forEach( ((subscription, index) => {
      if(subscription) subscription.unsubscribe();
    }));
  }

  subscribeRouteParams() {
    this.routeSubscription = this.route.paramMap.subscribe( paramMap => {
      let id = paramMap.get('id');
      if (typeof id == 'string') this.projectID = id;
      this.subscribeReceivedProject();
    });
  }

  subscribeReceivedProject() {
    this.projectSubscription = this.fireService.getByID(this.projectID, 'projects')
      .subscribe((project: any) => {
        if (!this.checkRouteExists(project)) return;
        this.project = new Project(project); // convert JSON iton Objekt
        if (project && project.managerID && project.managerID.trim().length > 0) this.subscribeProjectmanager(project.managerID);
        this.localFormatDate = new Date(project.dueDate).toLocaleDateString();
        //this.dueDateExpired = this.checkDateExpired();
      });
  }

  subscribeEmployees() {
    this.employeesSubscription = this.fireService.getCollection('employees', 'lastName')
      .subscribe ( employees => {
        if (employees) {
          this.employees = employees;
        }
      });
  }

  subscribeProjectmanager(managerID: string) {
    this.managerSubscription = this.fireService.getByID(managerID, 'employees')
      .subscribe( (manager)=>{
        if (manager) this.manager = manager;
      }); 
      //this.allSubscriptions.push(this.managerSubscription);
  }

  subscribeAssignedEmployees(){
    this.assigneesSubscription = this.fireService
      .getByValue('project_id',this.projectID,'employee_project')
      .subscribe( (result: any)=>{
        if (result) this.junctionTableDocs = result;
        if (this.junctionTableDocs) this.filterEmployees(this.junctionTableDocs)
      });
  }

  filterEmployees(junctionTableDocs: any) {
    //reset assignedEmployeeIDs in case of edit
    this.assignedEmployeeIDs.clear();
    for (let obj of this.junctionTableDocs) {
          this.assignedEmployeeIDs.add(obj.employee_id);
        }
    this.assignedEmployees = this.employees.filter( (empl: any) => {
      return this.assignedEmployeeIDs.has(empl.objID);
    });
  }

  setMinDate() {
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  }

  // checkDateExpired() {
  //   let now = new Date();
  //   let dueDate = new Date(this.project.dueDate);
  //   let endOfDueDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate(), 23, 59, 59);
  //   return now >= endOfDueDate
  // }

  // wh
  openDialog(dialogComponent: ComponentType<any>) {
    let dialog: MatDialogRef<any> = this.dialog.open(dialogComponent);
    return dialog;
  }

  passEditDetailData(dialog: MatDialogRef<any>){
    // pass a copy(!) of the current user object to the dialog component:
    dialog.componentInstance.project = new Project(this.project.toJSON());
    dialog.componentInstance.projectID = this.projectID;
    dialog.componentInstance.employees = this.employees;
    dialog.componentInstance.managerID = this.project.managerID;
    //dialog.componentInstance.dueDateExpired = this.project.dueDateExpired();
  }
  
  openEditDetails() {
    let dialog = this.openDialog(DialogEditProjectComponent);
    this.passEditDetailData(dialog);
  }
  
  openEditEmployees() {
    let dialog = this.openDialog(DialogEditProjectEmployeesComponent);
    dialog.componentInstance.employees = this.removeManagerFromAssignable();
    dialog.componentInstance.projectID = this.projectID;
    dialog.componentInstance.assignedEmployees = this.assignedEmployees;
    //dialog.afterClosed().subscribe((data) => {if(data) this.assignedEmployees = data}); // i subscribed assigned employees, so any change should be noticed and rendered
  }
  
  removeManagerFromAssignable() { // remove manager from assignable team-members 
    let assignableEmployees = this.employees.filter((e:any) => {
      return e.objID != this.project.managerID;
    });
    return assignableEmployees;
  }

  openDeleteDialog() {
    let dialog = this.openDialog(DialogDeleteProjectComponent);
    dialog.componentInstance.projectID = this.projectID;
    dialog.componentInstance.projectName = this.project.name;
  }

  // auslagern:
  checkRouteExists(client: any){
    if (client === undefined) {
      this.router.navigate(['/projects']);
      return false;
    }
    return true;
  }

}
