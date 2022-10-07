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
      .valueChanges({idField: 'objID'}); //returns collection / Observable that can be subscribed inside the component
  }

  add(documentObj: Object, collectionName: string) {
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

  /** 
   * @param field - field name in documents of the passed collection
   * @param value - value of the given field
   * @param collectionName - name of the collection in which to search for matching documents
   * @returns array of all found documents of the collection that match the passed value
   */
  getByValue(field: string, value: any, collectionName: string){ // T
    return this.firestore
      .collection(collectionName, ref => ref.where(field, '==', value))
      .valueChanges({idField: 'objID'});
  }

  //updateDoc
  update(data: any, id: string, collectionName: string) {
    //if ( !this.isJSON(data) ) data = data.toJSON();
    return this.firestore
      .collection(collectionName)
      .doc(id)
      .update(data);
  }

  createOrUpdate(data: any, id: string, collectionName: string) {
    return this.firestore
      .collection(collectionName)
      .doc(id)
      .set(data, {merge: true})
  }

  getWhere(field: any, value: any, collectionName: string){
    return this.firestore
      .collection(collectionName, ref => ref.where(field, '==', value))
      .get()
  }

  // deleteDoc
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

  // save user tasks in new collection inside users???
  // addUserTask(userID: string, task: object) {    
  //   this.firestore
  //     .doc(`users/${userID}`)
  //     .collection('tasks')
  //     .add(task);
  // }

  // isJSON(data: any) {
  //   try {
  //     JSON.parse(data);
  //   } catch (err) {
  //     return false;
  //   }
  //   return true;
  // }
  
}
