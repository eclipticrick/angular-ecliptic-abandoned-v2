import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FireStoreService {

  constructor(private afs: AngularFirestore) { }

  // getCollection(name): AngularFirestoreCollection<any> {
  //   return this.afs.collection(name);
  // }

  // getCollectionOrderby(name, orderby): AngularFirestoreCollection<any> {
  //   return this.afs.collection(name, ref => {
  //     return ref.orderBy(orderby)
  //   });
  // }

  // getCollectionOrderbyDesc(name, orderby): AngularFirestoreCollection<any> {
  //   return this.afs.collection(name, ref => {
  //     return ref.orderBy(orderby, 'desc')
  //   });
  // }

  // getCollectionWhere(name, whereI, operator, whereV): AngularFirestoreCollection<any> {
  //   return this.afs.collection(name, ref => {
  //     //                        >=
  //     return ref.where(whereI, operator, whereV)
  //   });
  // }

  // add limit / pagination

}
