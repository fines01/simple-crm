import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firestore: AngularFirestore,) { }

  addClient(client: any) {
    //Todo check if client already exists in DB (email should be unique)
    return this.firestore
      .collection('clients')
      .add(client.toJSON())
  }

  getClient(clientID: string) {
    return this.firestore
      .collection('clients')
      .doc(clientID)
      .valueChanges();
      // .subscribe( (client: any) => {
      //   if (client) { console.log (client); return client }; // Observable (h t pass)
      // });
  }

  updateClient(client: any, clientID: string) {
    return this.firestore
      .collection('clients')
      .doc(clientID)
      .update(client.toJSON()) // promise
  }

  deleteClient(clientID: string) {
    
  }

}
