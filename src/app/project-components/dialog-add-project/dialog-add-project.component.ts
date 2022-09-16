import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Project } from 'src/models/project.class';

@Component({
  selector: 'app-dialog-add-project',
  templateUrl: './dialog-add-project.component.html',
  styleUrls: ['./dialog-add-project.component.scss']
})
export class DialogAddProjectComponent implements OnInit {

  project = new Project();
  employees!: any[];
  dueDate!: Date;
  loading = false;
  manager!: any;
  managerID!: string;
  projectID!: string;
  
  constructor( 
    private dialogRef: MatDialogRef<DialogAddProjectComponent>,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {
    this.subscribeEmployees();
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }

  async saveProject() {
    this.loading = true;
    this.project.status = 'initialized';
    this.project.managerID = this.manager.objID;
    this.project.dueDate = this.dueDate.getTime();
    //
    await this.fireService.add(this.project.toJSON(), 'projects')
      .then( (result: any) => {
        //// add to junction table (edit: for employees M:N projects) --> add employees in edit-project
        // this.projectID = result.id;
        // if(this.projectID) this.saveDbRelations();
        this.loading = false;
        this.closeDialog();
      });
    }
    
  // // add to junction table (edit: for employees M:N projects)
  //   saveDbRelations(){
  //   let relDocument = {
  //     employee_id: this.manager.objID,
  //     project_id: this.projectID,
  //   }
  //   this.fireService.addToJunctionTable(relDocument, 'employee_project', this.manager.objID, this.projectID)
  //   .then( (res: any) => {
  //     console.log(res);
  //   });
  // }
  
  subscribeEmployees() {
    this.fireService.getCollection('employees', 'lastName')
      .subscribe ( employees => {
        if (employees) this.employees = employees;
      });
  }

}
