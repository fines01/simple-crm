import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FirestoreService } from 'src/app/firestore.service';
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

  saveProject() {
    this.loading = true;
    this.project.status = 'initialized';
    this.project.dueDate = this.dueDate.getTime();
    this.fireService.add(this.project.toJSON(), 'projects')
      .then( (result: any) => {
        this.loading = false;
        this.closeDialog();
      });
  }
  
  subscribeEmployees() {
    this.fireService.getCollection('employees')
      .subscribe ( employees => {
        if (employees) this.employees = employees;
        console.log(this.employees[0].firstName);
      });
  }

}
