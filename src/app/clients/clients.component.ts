import { Component, OnInit } from '@angular/core';
import { Client } from 'src/models/client.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClientComponent } from '../dialog-add-client/dialog-add-client.component';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  user: Client = new Client(); 
  allClients = [];

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void { 

  }

  openDialog() {
    let dialogRef = this.dialog.open( DialogAddClientComponent);

    dialogRef.afterClosed().subscribe( result => {
      console.log('Dialog was closed');
      // save result in variable
    })
  }

}
