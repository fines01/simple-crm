import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Client } from 'src/models/client.class';
import { ClientService } from 'src/app/services/client.service';

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
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.countries = this.client.countries;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveClient() {
    this.loading = true;
    this.clientService.addClient(this.client)
      .then( (result: any) => {
        this.loading = false;
        this.closeDialog();
      });
  }

}
