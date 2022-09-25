import { ComponentType } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { Client } from 'src/models/client.class';
import { DialogDeleteClientComponent } from '../dialog-delete-client/dialog-delete-client.component';
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
    private fireService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
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
    this.fireService.getByID(this.clientID, 'clients')
      .subscribe( (client: any) => {
        if (!this.checkRouteExists(client)) return;
        this.client = new Client(client); // convert retrieved client - JSON from DB in Object
      });
  }

  // auslagern:
  checkRouteExists(client: any){
    if (client === undefined) {
      this.router.navigate(['/clients']);
      return false;
    }
    return true;
  }

  openEditDetails(){
    this.openDialog(DialogEditClientComponent);
  }

  openEditAddress(){
    this.openDialog(DialogEditAddressComponent);
  }

  openDeleteDialog() {
    this.openDialog(DialogDeleteClientComponent);
  }

  openDialog(dialogComponent: ComponentType<any>) {
    const dialog: MatDialogRef<any> = this.dialog.open(dialogComponent);
    this.passEditData(dialog);
  }

  passEditData(dialog: MatDialogRef<any>){
    // pass a copy(!) of the current user object to the dialog component:
    dialog.componentInstance.client = new Client(this.client.toJSON());
    dialog.componentInstance.clientID = this.clientID;
  }

}
