import { AfterViewInit, ViewChild, Component, OnInit} from '@angular/core';
import { Employee } from 'src/models/employee.class';
import { MatDialog } from '@angular/material/dialog';
// import { DialogAddEmployeeComponent } from '../dialog-add-employee/dialog-add-employee.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DialogAddEmployeeComponent } from '../dialog-add-employee/dialog-add-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, AfterViewInit {

  employee: Employee = new Employee();
  allEmployees = [];
  sortedEmployees!: any[];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'address', 'department']; // countryCode?, address, + index ?
  dataSource = new MatTableDataSource(this.sortedEmployees);
  
  @ViewChild(MatPaginator) paginator = <MatPaginator>{};
  // @ViewChild(MatSort) sort = <MatSort>{}; // neccessary?

  constructor(
    private dialog: MatDialog,
    // private firestore: AngularFirestore,
    private fireService: FirestoreService,
  ) {
    this.sortedEmployees = this.allEmployees.slice(); // tst: in ngOnInit
  }

  ngOnInit(): void {
    this.fireService.getCollection('employees')
      .subscribe((changes: any) => {
        this.allEmployees = changes;
        this.sortedEmployees ? this.sortedEmployees = this.allEmployees : null;
        this.dataSource = new MatTableDataSource(this.sortedEmployees);
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
    let dialogRef = this.dialog.open(DialogAddEmployeeComponent);
  }


  // refactor and outsource table - sort code (same as in ex. clients, projects, all tables...)
  sortData(sort: any | Sort) {

    let data = this.allEmployees.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedEmployees = this.allEmployees;
      return;
    }

    this.sortedEmployees = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'firstName':
          return this.compare(a['firstName'], b['firstName'], isAsc);
        case 'last-name':
          return this.compare(a['lastName'], b['lastName'], isAsc);
        case 'zip-code':
          return this.compare(a['zipCode'], b['zipCode'], isAsc);
        case ('country-code'):
          return this.compare(a['countryCode'], b['countryCode'], isAsc);
        default:
          return 0;
      }
    });

    this.dataSource = new MatTableDataSource(this.sortedEmployees);
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
