import { AfterViewInit, ViewChild, Component, OnInit, ChangeDetectorRef, HostListener, ElementRef} from '@angular/core';
import { Client } from 'src/models/client.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClientComponent } from '../dialog-add-client/dialog-add-client.component';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MediaMatcher } from '@angular/cdk/layout';

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
  // @ViewChild(MatSort) sort = <MatSort>{}; // neccessary?
  
  constructor(
    private dialog: MatDialog,
    private firesService: FirestoreService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
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
    // check screen sizes, adapt which table colums are shown
    //this.setDisplayedTableColumns();

    if (this.dataSource) { 
      // this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  private _mobileQueryListener() {
    return this.changeDetectorRef.detectChanges();
  }

  // @HostListener('window:resize', ['$event'])
  // setDisplayedTableColumns(){
  //   // if (this.checkMobileQuery('(max-width: 480px)') && this.checkMobileQuery('(min-width: 321px)')) this.displayedColumns = ['firstName', 'lastName', 'contact'];
  //   // if (this.checkMobileQuery('(max-width: 768px)') && this.checkMobileQuery('(min-width: 481px)')) this.displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'countryCode'];
  //   // else if (this.checkMobileQuery('(min-width: 768px)')) this.displayedColumns =['firstName', 'lastName', 'email', 'phone', 'address', 'countryCode']; // + index ?
  // }
    
  // checkMobileQuery(query: string) {
  //   let mobileQuery: MediaQueryList;
  //   mobileQuery = this.media.matchMedia(query)
  //   this._mobileQueryListener; //= () => this.changeDetectorRef.detectChanges();
  //   mobileQuery.addListener(this._mobileQueryListener);
  //   return mobileQuery.matches;    
  // }

  sortClients(sort: any | Sort) {

    let data = this.allClients.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedClients = this.allClients;
      return;
    }
    this.sortedClients = data.sort((a, b) => {
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

    this.dataSource = new MatTableDataSource(this.sortedClients);
    this.dataSource.paginator = this.paginator;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogAddClientComponent);
    dialogRef.afterClosed().subscribe(result => {
      //console.log('Dialog was closed');
      // save result in variable
    })
  }

}
