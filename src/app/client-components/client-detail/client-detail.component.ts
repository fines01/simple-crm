import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/models/client.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditClientComponent } from '../dialog-edit-client/dialog-edit-client.component';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})

export class ClientDetailComponent implements OnInit {

  clientID!: string;
  client = new Client();

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe ( paramMap => {
      let id = paramMap.get('id');
      // typeof id == 'string' ? this.clientID = id : null ;
      if (typeof id == 'string') this.clientID = id;
      this.getClient();
    });
  }

  getClient() {
    this.firestore
      .collection('clients')
      .doc(this.clientID)
      .valueChanges()
      .subscribe( (client: any) => {
        this.client = new Client(client) // convert retrieved client - JSON from DB in Object
      })
  }

  // rename later dep on what to edit
  openEditDialog1() {
    const dialog = this.dialog.open(DialogEditClientComponent);
    // pass a copy of the current user object to the component:
    dialog.componentInstance.client = new Client(this.client.toJSON());
    dialog.componentInstance.clientID = this.clientID;
  }

  openEditDialog2() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.client = new Client(this.client.toJSON());
    dialog.componentInstance.clientID = this.clientID;
  }

}
