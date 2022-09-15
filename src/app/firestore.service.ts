import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore,) { }

  getCollection(collectionName: string) {
    return this.firestore
      .collection(collectionName)
      .valueChanges({idField: 'objID'}); //returns collection that can be subscribed inside the component
  }

  add(obj: Object, collectionName: string) {
    //Todo check if obj already exists in DB (case email- field exists: should be unique)
    return this.firestore
      .collection(collectionName)
      .add(obj)
  }

  getByID(id: string, collectionName: string) {
    return this.firestore
      .collection(collectionName)
      .doc(id)
      .valueChanges();
  }

  getByValue(field: any, value: any, collectionName: string){ // T
    return this.firestore
      .collection(collectionName, ref => ref.where(field, '==', value))
      .valueChanges();
  }

  update(obj: any, id: string, collectionName: string) {
    return this.firestore
      .collection(collectionName)
      .doc(id)
      .update(obj.toJSON()) // promise
  }

  updateField(obj: any, id: string, collectionName: string, fieldValueObj: object){
    // 
  }

  delete(id: string, collectionName: string) {
    return this.firestore
      .collection(collectionName)
      .doc(id)
      .delete();
  }

  // archive() {} // move to objName trash / archivedXyz collection
}
