import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { share, shareReplay } from 'rxjs';

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
      .valueChanges({idField: 'objID'}) //returns collection / Observable that can be subscribed inside the component
      .pipe( shareReplay(1) ) 
    }
    /* share() operator: it will share the data from the source observable rather than re-subscribing to it for each new subscription (but async pipes subscriptions in templates won't return any data because stream is already active and has emitted its initial data. Subsequent subscriptions will only receive data if a new data emission on the stream is triggered.
    Solution: using shareReplay() will 'replay' latest value that was emitted on the stream (here shareReplay(1) will emit one prev value when we subscribe to it
    param refCount 1 --> bufferSize of 1, we want just 1 prev value to be 'replayed' for each new subscriber
    optional: ShareReplyConfig: sharereply({ bufferSize: 1, refCount: true})
    refCount: false by default. If true: our shareReplay stream will unsubscribe from the source observable when there are no longer any subscribers to it, 
    else the shareReply stream will remain subscribed to the source observable and just keep running (Maybe makes sense if i want to keep this single db stream consistently available through the entile life of the app in this case) */

  add(documentObj: Object, collectionName: string) {
    return this.firestore
      .collection(collectionName)
      .add(documentObj)
  }

  getByID(id: string, collectionName: string) {
    return this.firestore
      .collection(collectionName)
      .doc(id)
      .valueChanges()
      .pipe ( share() );
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
      .valueChanges({idField: 'objID'})
      .pipe( share() );
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
      .pipe(share())
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

  // isJSON(data: any) {
  //   try {
  //     JSON.parse(data);
  //   } catch (err) {
  //     return false;
  //   }
  //   return true;
  // }
  
}
