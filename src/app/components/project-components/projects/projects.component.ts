import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { TableSortService } from 'src/app/services/table-sort.service';
import { Project } from 'src/models/project.class';
import { DialogAddProjectComponent } from '../dialog-add-project/dialog-add-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  project: Project = new Project();
  allProjects = [];
  sortedProjects!: any[];
  displayedColumns: string[] = ['name', 'manager', 'client', 'dueDate', 'status']; // countryCode?, address, + index ?
  dataSource = new MatTableDataSource(this.sortedProjects);
  managers: any = [];
  managerSubscription!: Subscription;
  projectsSubscription!: Subscription;
  
  @ViewChild(MatPaginator) paginator = <MatPaginator>{};
  // @ViewChild(MatSort) sort = <MatSort>{}; // neccessary?

  constructor(
    private dialog: MatDialog,
    private fireService: FirestoreService,
    private sortService: TableSortService,
  ) {
    this.sortedProjects = this.allProjects.slice();
  }

  ngOnInit(): void {
    this.projectsSubscription = this.fireService.getCollection('projects')
      .subscribe((changes: any) => {
        this.allProjects = changes;
        if (this.allProjects) this.addManagers(); // add manager names for received projects
        if (this.sortedProjects) this.sortedProjects = this.allProjects; //check in components: clients, employees
        this.dataSource = new MatTableDataSource(this.sortedProjects);
        if (this.dataSource) this.dataSource.paginator = this.paginator;
      });

  }

  ngOnDestroy(): void {
    if (this.projectsSubscription) this.projectsSubscription.unsubscribe();
    if (this.managerSubscription) this.managerSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    if (this.dataSource) { 
      this.dataSource.paginator = this.paginator;
    }
  }

  addManagers() {
    this.allProjects.forEach( (doc: any) => {
      if (doc.managerID && doc.managerID.trim().length > 0)
        this.getManagerName(doc.managerID, doc);
    });
  }

  getManagerName(managerID: string, document: any) {
    this.managerSubscription = this.fireService.getByID(managerID, 'employees')
      .subscribe( (result: any)=>{
        if(result) {
          let name = `${result.firstName} ${result.lastName}`;
          if (name) document.managerName = name;
        }
      });
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogAddProjectComponent);
  }

  convertTimestamp(timestampMs: number){
    return new Date(timestampMs).toLocaleDateString();
  }

  checkDateExpired(date: any) {
    return this.project.dueDateExpired(date);
  }

  sortProjectData(sort: any | Sort) {
    let sortColumns: string[] = ['name', 'manager.lastName','client','dueDate','status'];
    this.sortedProjects = this.sortService.sortData(sort, this.allProjects, sortColumns);
    this.dataSource = new MatTableDataSource(this.sortedProjects);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
