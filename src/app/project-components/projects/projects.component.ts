import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirestoreService } from 'src/app/firestore.service';
import { Project } from 'src/models/project.class';
import { DialogAddProjectComponent } from '../dialog-add-project/dialog-add-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  project: Project = new Project();
  allProjects = [];
  sortedProjects!: any[];
  displayedColumns: string[] = ['name', 'manager', 'client', 'dueDate', 'status']; // countryCode?, address, + index ?
  dataSource = new MatTableDataSource(this.sortedProjects);

  localFormatdate!: string;
  
  @ViewChild(MatPaginator) paginator = <MatPaginator>{};
  // @ViewChild(MatSort) sort = <MatSort>{}; // neccessary?

  constructor(
    private dialog: MatDialog,
    private fireService: FirestoreService,
  ) {
    this.sortedProjects = this.allProjects.slice(); // tst: in ngOnInit
  }

  ngOnInit(): void {
    this.fireService.getCollection('projects')
      .subscribe((changes: any) => {
        this.allProjects = changes;
        if (this.sortedProjects) this.sortedProjects = this.allProjects; //check in components: clients, employees
        this.dataSource = new MatTableDataSource(this.sortedProjects);
        if (this.dataSource) this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit() {
    if (this.dataSource) { 
      // this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogAddProjectComponent);
  }

  convertTimestamp(timestampMs: number){
    return new Date(timestampMs).toLocaleDateString();
  }

  // refactor and outsource table - sort code (same as in ex. clients, projects, all tables...)
  sortData(sort: any | Sort) {

    let data = this.allProjects.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedProjects = this.allProjects;
      return;
    }

    this.sortedProjects = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'name':
          return this.compare(a['name'], b['name'], isAsc);
        case 'manager':
          return this.compare(a['manager'], b['manager'], isAsc);
        case 'client':
          return this.compare(a['client'], b['client'], isAsc);
        case ('dueDate'):
          return this.compare(a['dueDate'], b['dueDate'], isAsc);
        case ('status'):
          return this.compare(a['status'], b['status'], isAsc);
        default:
          return 0;
      }
    });

    this.dataSource = new MatTableDataSource(this.sortedProjects);
    this.dataSource.paginator = this.paginator;
  }

  // outsource sort functionalities
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  // outsource table sort functionalities
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}