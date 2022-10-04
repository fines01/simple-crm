import { AfterViewInit, ViewChild, Component, OnInit} from '@angular/core';
import { Employee } from 'src/models/employee.class';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DialogAddEmployeeComponent } from '../dialog-add-employee/dialog-add-employee.component';
import { TableSortService } from 'src/app/services/table-sort.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, AfterViewInit {

  employee: Employee = new Employee();
  allEmployees = [];
  sortedEmployees!: any[];
  displayedColumns: string[] = ['firstName', 'lastName', 'contact', 'email', 'phone', 'department','countryCode'];
  dataSource = new MatTableDataSource(this.sortedEmployees);
  
  @ViewChild(MatPaginator) paginator = <MatPaginator>{};
  // @ViewChild(MatSort) sort = <MatSort>{}; //

  constructor(
    private dialog: MatDialog,
    private fireService: FirestoreService,
    private sortService: TableSortService
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

  sortEmployeeData(sort: any | Sort) {
    let sortColumns = ['firstName', 'lastName', 'zipCode', 'department', 'countryCode'];
    this.sortedEmployees = this.sortService.sortData(sort, this.allEmployees, sortColumns);
    this.sortedEmployees = this.sortService.sortData(sort, this.allEmployees, sortColumns);
    this.dataSource = new MatTableDataSource(this.sortedEmployees);
    this.dataSource.paginator = this.paginator;
  }

  // table filter
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
