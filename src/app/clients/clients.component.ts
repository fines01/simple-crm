import { Component, OnInit } from '@angular/core';
import { Client } from 'src/models/client.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClientComponent } from '../dialog-add-client/dialog-add-client.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})


export class ClientsComponent implements OnInit {

  user: Client = new Client(); 
  allClients = [];

  constructor (
    private dialog: MatDialog,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit(): void { 
    this.firestore
      .collection('clients')
      .valueChanges( {idField: 'clientID' })
      .subscribe( (changes: any) => {
        console.log('received changes from DB ', changes);
        this.allClients = changes;
      });
  }

  openDialog() {
    let dialogRef = this.dialog.open( DialogAddClientComponent);

    dialogRef.afterClosed().subscribe( result => {
      console.log('Dialog was closed');
      // save result in variable
    })
  }

}
