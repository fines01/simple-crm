import { ComponentType } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Project } from 'src/models/project.class';
import { DialogEditProjectEmployeesComponent } from '../dialog-edit-project-employees/dialog-edit-project-employees.component';
import { DialogEditProjectComponent } from '../dialog-edit-project/dialog-edit-project.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  // TODO fix edit project: values from project manager

  projectID!: string;
  project = new Project(); // else undefined at beginning -- console.error
  employees!: any;
  assignedEmployeeIDs = new Set(); // Set Object: collection of unique values // nn global ??
  assignedEmployees: any[] = []; // project.employees;
  manager!: any;
  managerColorCode!: string; // color-code of employee who manages the project
 
  localFormatDate!: string;

  constructor(
    private route: ActivatedRoute,
    private fireService: FirestoreService,
    private dialog: MatDialog,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      let id = paramMap.get('id');
      if (typeof id == 'string') this.projectID = id;
      this.subscribeReceivedProject();
    });
    this.subscribeEmployees();
  }

  subscribeReceivedProject() {
    this.fireService.getByID(this.projectID, 'projects')
      .subscribe((project: any) => {
         if (!this.checkRouteExists(project)) return;
        this.project = new Project(project); // convert JSON iton Objekt
        if (project) this.getProjectmanager(project.managerID);
        this.localFormatDate = new Date(project.dueDate).toLocaleDateString();
      });
  }

  subscribeEmployees() {
    this.fireService.getCollection('employees', 'lastName')
      .subscribe ( employees => {
        if (employees) {
          this.employees = employees;
          this.getAssignedEmployees(); // hier? runs everytime afer changes happen...
        }
      });
  }

  // in projects (list) --> pass to this component?
  getProjectmanager(managerID: string) {
    this.fireService.getByID(managerID, 'employees')
      .subscribe( (manager)=>{
        if (manager) this.manager = manager;
      });
  }

  getAssignedEmployees(){
    // 1. get all documents from junction table employees_projects where project_id == this.projectID 
    let junctionDocs:any[] = [];
    // let assignedEmployeeIDs = new Set(); // Set Object: collection of unique values

    this.fireService
      .getByValue('project_id',this.projectID,'employee_project')
      .subscribe( (result: any)=>{
        if (result) junctionDocs = result;
        if (junctionDocs.length > 0) this.filterEmployees(junctionDocs)
      });
    
  }

  filterEmployees(junctionTableDocs: any) {
    for (let obj of junctionTableDocs) {
          this.assignedEmployeeIDs.add(obj.employee_id);
        }
    this.assignedEmployees = this.employees.filter( (empl: any) => {
      return this.assignedEmployeeIDs.has(empl.objID);
    });
  }

  // wh

  openDialog(dialogComponent: ComponentType<any>) {
    let dialog: MatDialogRef<any> = this.dialog.open(dialogComponent);
    //this.passEditData(dialog);
    return dialog;
  }

  passEditData(dialog: MatDialogRef<any>){
    // pass a copy(!) of the current user object to the dialog component: else every typed change in the text field will be saved immediately into original (two-way-binding)
    dialog.componentInstance.project = new Project(this.project.toJSON());
    dialog.componentInstance.projectID = this.projectID;
    dialog.componentInstance.employees = this.employees;
    dialog.componentInstance.managerID = this.project.managerID;
  }

  openEdit() {
    let dialog = this.openDialog(DialogEditProjectComponent);
    this.passEditData(dialog);
  }

  openEditEmployees() {
    let dialog = this.openDialog(DialogEditProjectEmployeesComponent);
    dialog.componentInstance.employees = this.removeManager();
    dialog.componentInstance.projectID = this.projectID;
    dialog.componentInstance.assignedEmployees = this.assignedEmployees;
  }
  
  removeManager() {
    let assignableEmployees = this.employees.filter((e:any) => {
      return e.objID != this.project.managerID;
    });
    return assignableEmployees;
  }

  openDeleteDialog() {
    //this.openDialog(DialogDeleteEmployeeComponent);
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
