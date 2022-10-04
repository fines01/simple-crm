import { AfterViewInit, ViewChild, Component, OnInit, ChangeDetectorRef, HostListener, ElementRef} from '@angular/core';
import { Client } from 'src/models/client.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClientComponent } from '../dialog-add-client/dialog-add-client.component';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { TableSortService } from 'src/app/services/table-sort.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit, AfterViewInit {

  
  client: Client = new Client(); // necessary??
  allClients = [];
  sortedClients!: any[];
  displayedColumns: string[] = ['firstName', 'lastName', 'contact', 'email', 'phone', 'address', 'countryCode']; // + index ?
  dataSource = new MatTableDataSource(this.sortedClients);

  mobileQueryM!: MediaQueryList;
  
  @ViewChild(MatPaginator) paginator = <MatPaginator>{};
  @ViewChild('table') table!:ElementRef;
  
  constructor(
    private dialog: MatDialog,
    private firesService: FirestoreService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private sortService: TableSortService
    ) {
      this.sortedClients = this.allClients.slice(); // tst: in ngOnInit
    }

  ngOnInit(): void {
    this.firesService
      .getCollection('clients')
      .subscribe((changes: any) => {
        this.allClients = changes;
        this.sortedClients ? this.sortedClients = this.allClients : null;
        this.dataSource = new MatTableDataSource(this.sortedClients);
        if (this.dataSource) this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit() {
    if (this.dataSource) { 
      // this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  private _mobileQueryListener() {
    return this.changeDetectorRef.detectChanges();
  }

  sortClientData(sort: any | Sort) {
    let sortColumns = ['firstName', 'lastName', 'zipCode', 'countryCode'];
    this.sortedClients = this.sortService.sortData(sort, this.allClients, sortColumns);
    this.sortedClients = this.sortService.sortData(sort, this.allClients, sortColumns);
    this.dataSource = new MatTableDataSource(this.sortedClients);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogAddClientComponent);
    // dialogRef.afterClosed().subscribe(result => {
    // })
  }

}
