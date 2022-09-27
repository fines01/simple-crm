import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Client } from 'src/models/client.class';
import { FirestoreService } from 'src/app/services/firestore.service';

export interface DialogData {}

@Component({
  selector: 'app-dialog-add-client',
  templateUrl: './dialog-add-client.component.html',
  styleUrls: ['./dialog-add-client.component.scss']
})
export class DialogAddClientComponent implements OnInit {

  client = new Client();
  loading = false;
  countries!: string[];

  constructor( 
    private dialogRef: MatDialogRef<DialogAddClientComponent>,
    private fireService: FirestoreService
  ) { }

  ngOnInit(): void {
    this.countries = this.client.countries;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveClient() {
    this.loading = true;
    this.fireService.add(this.client, 'clients')
      .then( (result: any) => {
        this.loading = false;
        this.closeDialog();
      });
  }

}
