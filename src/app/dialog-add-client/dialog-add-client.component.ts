import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Client } from 'src/models/client.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface DialogData {}

@Component({
  selector: 'app-dialog-add-client',
  templateUrl: './dialog-add-client.component.html',
  styleUrls: ['./dialog-add-client.component.scss']
})
export class DialogAddClientComponent implements OnInit {

  client = new Client();
  loading = false;
  countries = ['AUT', 'CHE', 'DEU', 'CAN', 'GBR', 'USA']

  constructor( 
    private dialogRef: MatDialogRef<DialogAddClientComponent>,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveClient() {
    this.loading = true;
    // todo: verify, check if client already exists (later check via email, eg)
    // save in firestore
    this.firestore
      .collection('clients')
      .add(this.client.toJSON())
      .then( (result: any) => {
        console.log('Adding client: finished ', result);
        this.loading = false;
        // decide: clear inputs or close dialog or or ask if another client should be added before close
        this.closeDialog();
      });
  }

}
