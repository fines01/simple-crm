import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/models/client.class';

@Component({
  selector: 'app-dialog-edit-client',
  templateUrl: './dialog-edit-client.component.html',
  styleUrls: ['./dialog-edit-client.component.scss']
})
export class DialogEditClientComponent implements OnInit {

  client!: Client;
  clientID!: string;
  loading = false;
    
  constructor(
    private dialogRef: MatDialogRef<DialogEditClientComponent>, 
    private dialog: MatDialog,
    private firestore: AngularFirestore,
    ) { }

  ngOnInit(): void {
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
