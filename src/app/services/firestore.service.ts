import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore,) { }

  getCollection(collectionName: string, orderByDoc?: string) {
    let queryFn!: any;
    orderByDoc ?  queryFn = (ref: any) => ref.orderBy(orderByDoc, 'asc') : queryFn = undefined;
    
    return this.firestore
      .collection(collectionName, queryFn  )
      .valueChanges({idField: 'objID'}); //returns collection that can be subscribed inside the component
  }

  add(documentObj: Object, collectionName: string) {
    //Todo check if documentObj already exists in DB (case email- field exists: should be unique)
    return this.firestore
      .collection(collectionName)
      .add(documentObj)
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

  update(documentObj: any, id: string, collectionName: string) {
    return this.firestore
      .collection(collectionName)
      .doc(id)
      .update(documentObj.toJSON()) // promise
  }

  updateField(documentObj: any, id: string, collectionName: string, fieldValueObj: object){
    // 
  }

  delete(id: string, collectionName: string) {
    return this.firestore
      .collection(collectionName)
      .doc(id)
      .delete();
  }

  addToJunctionTable(documentJson: object, collectionName: string, id1:string, id2:string) { //set custom ID doc1ID_doc2ID
    let customID = `${id1}_${id2}`;

    return this.firestore.collection(collectionName)
      .doc(customID).set(documentJson);
  }
  
  // archive() {} // move to objName trash / archivedXyz collection
}
