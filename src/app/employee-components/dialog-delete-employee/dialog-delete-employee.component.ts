import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Employee } from 'src/models/employee.class';
import { Project } from 'src/models/project.class';

@Component({
  selector: 'app-dialog-delete-employee',
  templateUrl: './dialog-delete-employee.component.html',
  styleUrls: ['./dialog-delete-employee.component.scss']
})
export class DialogDeleteEmployeeComponent implements OnInit, OnDestroy {

  loading = false;
  showSuccessMsg = false;
  showErrorMsg = false;
  employee!: Employee;
  project!: Project;
  employeeID!: string;
  assignedProjects!: any[];
  managedProjects!: any[];

  dialogTitle = 'Delete Employee?';
  dialogMessage = 'Do you really want to delete the employee: ';

  junctionSubscription!: Subscription;
  projectsSubscription!: Subscription;

  constructor(
    private dialogRef: MatDialogRef<DialogDeleteEmployeeComponent>,
    private fireService: FirestoreService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.junctionSubscription) this.junctionSubscription.unsubscribe();
    if (this.projectsSubscription) this.projectsSubscription.unsubscribe();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeDelete() {
    setTimeout(()=> {
      //this.router.navigate(['/clients']); // instead --> checkRouteExists() in employee-detail
      this.closeDialog()
    },2500);
  }

  deleteEmployee() {
    this.loading = true;
    this.fireService.delete(this.employeeID, 'employees')
      .then( (result: any)=>{
        this.deleteDependencies();
        this.setSuccessDialog();
        this.closeDelete();
        this.loading = false; // maybe in finally()
      })
      .catch ( (err) => console.warn('%c error deleting Employee: '+err, 'color:blue') ) // TDOD: error dialog
      .finally (()=> console.info('%c Employee deletion completed ', 'color: white; background: #333399')); // check 4

  }

  deleteDependencies() { // wird ausgeführt, fehler muss in eine der fkt liegen
    this.deleteJunctionDocs();
    this.deleteManagerFromProjects();
  }
      
  deleteJunctionDocs() { // TEST
    let junctionDocs!: any[];
    this.junctionSubscription = this.fireService
    .getByValue('employee_id',this.employeeID,'employee_project')
    .subscribe( (res: any) => {
      if (res) junctionDocs = res;
      //
      if (junctionDocs) {
        junctionDocs.forEach( (doc: any) => 
          {
            this.fireService.delete(doc.objID, 'employee_project')
            .then( (res)=> console.info('%c Junctions deletion completed ', 'color: white; background: #333399')) // check 7
            .catch ( (err) => console.warn('%c Error deleting junctions: '+err, 'color:blue') ) // TDOD: error dialog;
          });
      }
    });
  }

  deleteManagerFromProjects() { // TEST
    let managedProjects!: any[];
    this.projectsSubscription = this.fireService.getByValue('managerID', this.employeeID, 'projects')
      .subscribe( (res: any) => {
        if (res) managedProjects = res;
        //
        if (managedProjects) managedProjects.forEach( (p)=> {  
          this.fireService.update({managerID: ''},p.objID,'projects') // TypeError: documentObj.toJSON is not a function at FirestoreService.update (firestore.service.ts:49:27)
            .then( (res)=> console.info('%c Projects managerID update completed ', 'color: white; background: #333399')) // NO
            .catch ( (err) => console.warn('%c Error updating projects managerID: '+err, 'color:blue') ) // TDOD: error dialog;;
        });
      });
  }

  setSuccessDialog() {
    this.dialogTitle = 'Success!';
    this.dialogMessage = 'Deleted employee:';
    this.showSuccessMsg = true;
  }

  // TODO make/ design error dialog 
  setErrorDialog() {
    this.dialogTitle = 'ooops!';
    this.dialogMessage = 'Something went wrong. Deletion failed for:'
    this.showErrorMsg = true;
  }

}
