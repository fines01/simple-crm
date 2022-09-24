import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
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
    private fireService: FirestoreService,
    ) { }

  ngOnInit(): void {
    this.countries = this.client.countries;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveEdit() {
    this.loading = true;
    this.fireService.update(this.client.toJSON(), this.clientID, 'clients')
      .then(()=>{ 
        this.loading = false;
        this.closeDialog();
      });
  }

}
