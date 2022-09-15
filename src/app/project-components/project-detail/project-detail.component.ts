import { ComponentType } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/firestore.service';
import { Project } from 'src/models/project.class';
import { DialogEditProjectComponent } from '../dialog-edit-project/dialog-edit-project.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  projectID!: string;
  project = new Project(); // else undefined at beginning -- console.error
  assignedEmployees!: string[]; // project.employees;
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
      console.log( 'git ID: ', id, this.projectID);
      this.subscribeReceivedProjects();
    });
  }

  subscribeReceivedProjects() {
    this.fireService.getByID(this.projectID, 'projects')
      .subscribe((project: any) => {
         if (!this.checkRouteExists(project)) return;
        this.project = new Project(project); // convert JSON iton Objekt
        console.log('retreived project: ', project);
        this.localFormatDate = new Date(project.dueDate).toLocaleDateString();
      });
  }

  //wh
  openDialog(dialogComponent: ComponentType<any>) {
    const dialog: MatDialogRef<any> = this.dialog.open(dialogComponent);
    this.passEditData(dialog);
  }

  passEditData(dialog: MatDialogRef<any>){
    // pass a copy(!) of the current user object to the dialog component: else every typed change in the text field will be saved immediately into original (two-way-binding)
    dialog.componentInstance.project = new Project(this.project.toJSON());
    dialog.componentInstance.projectID = this.projectID;
  }

  openEdit() {
    this.openDialog(DialogEditProjectComponent);
  }

  openEditInfo() {}

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
