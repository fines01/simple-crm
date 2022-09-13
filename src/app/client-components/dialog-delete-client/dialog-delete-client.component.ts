import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/models/client.class';

@Component({
  selector: 'app-dialog-delete-client',
  templateUrl: './dialog-delete-client.component.html',
  styleUrls: ['./dialog-delete-client.component.scss']
})
export class DialogDeleteClientComponent implements OnInit {

  loading = false;
  deleted = false;
  client!: Client;
  clientID!: string;

  dialogTitle = 'Delete Client?';
  dialogMessage = 'Do you really want to delete the client: ';

  constructor(
    private dialogRef: MatDialogRef<DialogDeleteClientComponent>,
    private clientService: ClientService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeDelete() {
    setTimeout(()=> {
      //this.router.navigate(['/clients']); // instead --> checkRouteExists() in client-detail
      this.closeDialog()
    },2500);
  }

  deleteClient() {
    this.loading = true;
    this.clientService.deleteClient(this.clientID)
      .then( (result: any)=>{
        this.loading = false;
        this.setSuccessDialog();
        this.closeDelete();
      });
  }

  setSuccessDialog() {
    this.dialogTitle = 'Success!';
    this.dialogMessage = 'Deleted client:';
    this.deleted = true;
  }

}
