import { ComponentType } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/client.service';
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
    private clientService: ClientService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe ( paramMap => {
      let id = paramMap.get('id');
      if (typeof id == 'string') this.clientID = id;
      this.subscribeReceivedClient();
    });
  }

  subscribeReceivedClient() {
    this.clientService.getClient(this.clientID)
      .subscribe( (client: any) => {
        this.client = new Client(client); // convert retrieved client - JSON from DB in Object
      });
  }

  openEditDetails(){
    this.openDialog(DialogEditClientComponent);
  }

  openEditAddress(){
    this.openDialog(DialogEditAddressComponent);
  }

  openDialog(dialogComponent: ComponentType<any>) {
    const dialog: MatDialogRef<any> = this.dialog.open(dialogComponent);
    dialog.componentInstance.client = new Client(this.client.toJSON());
    dialog.componentInstance.clientID = this.clientID;
  }

  passEditData(dialog: MatDialogRef<any>){
    // pass a copy(!) of the current user object to the component:
    dialog.componentInstance.client = new Client(this.client.toJSON());
    dialog.componentInstance.clientID = this.clientID;
  }

}
