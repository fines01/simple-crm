import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';
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
    private fireService: FirestoreService,
    ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveEdit() { //TODO use firestore service
    this.loading = true;
    this.fireService.update(this.client.toJSON(), this.clientID, 'clients')
      .then(()=>{ 
        this.loading = false;
        this.closeDialog();
      });
  }
}
