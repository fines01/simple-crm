import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-dialog-edit-project-employees',
  templateUrl: './dialog-edit-project-employees.component.html',
  styleUrls: ['./dialog-edit-project-employees.component.scss']
})
export class DialogEditProjectEmployeesComponent implements OnInit, OnDestroy {

  loading = false;
  employees!: any[];
  projectID!: string;
  assignedEmployees!: any[];
  junctionSubscription!: Subscription;

  //employees = new FormControl('');

  constructor(
    private fireService: FirestoreService,
    private dialogRef: MatDialogRef<DialogEditProjectEmployeesComponent>,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.junctionSubscription) this.junctionSubscription.unsubscribe();
  }

  closeDialog(data?:any) {
    this.dialogRef.close(data);
  }

  // employees : projects --> m:n , save in a junction-table
  saveEdit() {
    this.loading = true;
    this.junctionSubscription = this.fireService
      .getByValue('project_id',this.projectID,'employee_project')
      .subscribe( (res: any) => {
        if (res) this.updateJunctionTable(res)
        .then(() => console.info('save edit: success'))
        .catch((err) => console.warn(err))
        .finally(() => this.afterSaveSuccess());
      });
  }

  async updateJunctionTable(junctionDocs: any[]){
    // extract employee ids from newly assigned employees
    let employeeIDs = this.assignedEmployees.map( (doc) => {
      return doc.objID;
    });
    // 1. compare assigned employee ids against employees from junction table in db
    // 1.1 remove from db if necessary
    junctionDocs.forEach( (doc: any) => {
      this.checkRemoveEmployee(employeeIDs, doc.employee_id)
    })
    // 1. 2 add doc if employee exists in assigned employeeIDs but not in DB // CHECK
    employeeIDs.forEach( (id: any) =>  {
      this.checkAddEmployee(junctionDocs, id)
    });   
  }

  checkRemoveEmployee(employeeIDs: string[], id: string) {
    if (employeeIDs.indexOf(id) === -1){
        let docID = `${id}_${this.projectID}`;
        this.fireService.delete(docID, 'employee_project')
          .then( (res) => console.info('%c SUCCESS deleting employee from project: ', 'color: white; background: #333399'))
          .catch ( (err) => console.warn('%c ERROR deleting employee from project: '+err, 'color: blue'))
          //.finally (()=> console.info('%c deleting employee(s) from project: completed ', 'color: white; background: #333399'));
    }
  }

  checkAddEmployee(junctionDocs: any[], id: string) {
    if (junctionDocs.map( (entry: any) => entry.employee_id).indexOf(id) == -1) {
        let newEntry = {employee_id: id, project_id: this.projectID};
        this.fireService.addToJunctionTable(newEntry, 'employee_project', id, this.projectID)
          .then( (res) => console.info('%c SUCCESS adding employee to project. ', 'color: white; background: #333399'))
          .catch ( (err) => console.warn('%c ERROR adding employee to project: '+err, 'color: blue') )
          //.finally (()=> console.info('%c adding employees to project: completed ', 'color: white; background: #333399'));
      } 
  }

  afterSaveSuccess(){
    this.loading = false;
    this.closeDialog();
  }

  afterSaveError() {}
}

