import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Client } from 'src/models/client.class';

export interface DialogData {}

@Component({
  selector: 'app-dialog-add-client',
  templateUrl: './dialog-add-client.component.html',
  styleUrls: ['./dialog-add-client.component.scss']
})
export class DialogAddClientComponent implements OnInit {

  client = new Client();
  loading = false;

  constructor( 
    private dialogRef: MatDialogRef<DialogAddClientComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveUser() {
    this.loading = true;
    // save in firestore
    // check if client already exists (later check via email, eg)
    //   this.closeDialog(); or ask if another client should be added
    // });
  }

}
