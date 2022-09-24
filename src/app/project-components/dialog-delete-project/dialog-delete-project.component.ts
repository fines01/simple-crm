import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-dialog-delete-project',
  templateUrl: './dialog-delete-project.component.html',
  styleUrls: ['./dialog-delete-project.component.scss']
})
export class DialogDeleteProjectComponent implements OnInit, OnDestroy {

  loading = false;
  showSuccessMsg = false;
  showErrorMsg = false;
  projectName!: string;
  projectID!: string;

  junctionSubscription!: Subscription;

  dialogTitle ='Delete project?';
  dialogMessage = 'Do you really want to delete the project?';

  constructor(
    private dialogRef: MatDialogRef<DialogDeleteProjectComponent>,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {
    if (this.projectName) {
      this.dialogTitle =`Delete project <b>${this.projectName}</b>`;
      this.dialogMessage = `Do you really want to delete the project?`;//`The project is still in stage: <b>initialized</b>.<br>Do you really want to delete it?`;
    }
  }

  ngOnDestroy(): void {
    if (this.junctionSubscription) this.junctionSubscription.unsubscribe();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeDelete() {
     setTimeout(()=> {
      this.closeDialog()
    },2500);
  }

  setSuccessDialog() {
    this.dialogTitle = 'Success!';
    this.dialogMessage = `Project deleted: <b>${this.projectName}</b>.`;
    this.showSuccessMsg = true;
  }

  // TODO make/ design error dialog 
  setErrorDialog() {
    this.dialogTitle = 'Ooops!';
    this.dialogMessage = `Something went wrong. Deletion failed for: <b>${this.projectName}</b> `
    this.showErrorMsg = true;
  }

  deleteProject() {
    this.loading = true;
    this.fireService.delete(this.projectID, 'projects')
      .then( ()=>{
        this.deleteJunctionDocs(); // GN
        this.deletionSuccess();
      })
      .catch( (err) => {
        console.warn(err);
        this.deletionError();
      })
      .finally( ()=> this.closeDelete());
  }

  deleteJunctionDocs(){
    let junctionDocs: any[];
    this.junctionSubscription = this.fireService.getByValue('project_id',this.projectID,'employee_project')
      .subscribe((res) => {
        if (res) junctionDocs = res;
        if (junctionDocs) junctionDocs.forEach( (doc: any) => {
          this.fireService.delete(doc.objID, 'employee_project')
            .then( () => console.info('%c Junction deletion completed ', 'color: white; background: #333399')) // check but doesn't get deleted
            .catch ( (err) => console.warn('%c Error deleting junction: '+err, 'color:blue') ) // TDOD: error dialog;;
        });
      });
  }

  deletionSuccess(){
    this.loading = false;
    this.showSuccessMsg = true;
    this.setSuccessDialog();
  }

  deletionError() {
    this.showErrorMsg = true;
    this.setErrorDialog(); // TODO error dialog
  }

}
