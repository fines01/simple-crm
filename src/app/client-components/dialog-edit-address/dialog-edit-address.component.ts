import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/models/client.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {

  client!: Client;
  clientID!: string;
  loading = false;
  countries!: string[];
    
  constructor(
    private dialogRef: MatDialogRef<DialogEditAddressComponent>, 
    private dialog: MatDialog,
    private firestore: AngularFirestore,
    ) { }

  ngOnInit(): void {
    this.countries = this.client.countries;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveEdit() {
    this.loading = true;
    this.firestore
      .collection('clients')
      .doc(this.clientID)
      .update(this.client.toJSON()) // promise
      .then(()=>{ 
        this.loading = false;
        this.closeDialog();
      });
  }

}
