import { Component, OnInit} from '@angular/core';
import { Client } from 'src/models/client.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClientComponent } from '../dialog-add-client/dialog-add-client.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {

  user: Client = new Client();
  allClients = [];
  sortedClients!: any[];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'address', 'countryCode']; // + index ?

  dataSource = new MatTableDataSource(this.sortedClients);

  constructor(
    private dialog: MatDialog,
    private firestore: AngularFirestore,
  ) {
    this.sortedClients = this.allClients.slice(); // tst: in ngOnInit
  }

  ngOnInit(): void {
    this.firestore
      .collection('clients')
      .valueChanges({
        idField: 'clientID'
      })
      .subscribe((changes: any) => {
        console.log('received changes from DB ', changes);
        this.allClients = changes;

        this.sortedClients ? this.sortedClients = this.allClients : null;
        this.dataSource = new MatTableDataSource(this.sortedClients);
        console.log(this.sortedClients, this.dataSource)
      });

  }

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
      console.log('Dialog was closed');
      // save result in variable
    })
  }

}
