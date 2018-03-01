import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
//import { Observable } from "rxjs/Observable";
import { Observable } from 'rxjs/Rx'
import { ToastMessage } from "@models/toast-message";
import { User } from "@models/user";
import 'rxjs/add/operator/map';
import "rxjs/add/observable/of";
import * as firebase from "firebase/app";

@Injectable()
export class FireToastService {

  messages$: Observable<ToastMessage[]>;
  messages: ToastMessage[] = [];

  constructor(private afs: AngularFirestore) {
    this.messages$ = Observable.of(this.messages);
  }

  getMessages(user?:User) {
    let messages = this.messages$;
    if(user) messages = Observable.merge(messages, this.getUserMessages(user.uid));

    return messages
  }
  getUserMessages(userId): Observable<ToastMessage[]> {
    return this.afs.collection(`users/${userId}/messages`).snapshotChanges().map(messages => {
      return messages.map(message => (<ToastMessage>{ $id: message.payload.doc.id, type: 'user', ...message.payload.doc.data() }));
    });
  }




  saveLocalMessage(style, content) {
    const message = new ToastMessage('local', new Date(), content, style);
    this.messages.push(message)
  }
  saveUserMessage(user:User, style, content):Promise<any> {
    const message = new ToastMessage('user', new Date(), content, style);
    const object = JSON.parse(JSON.stringify(message));
    return this.afs.collection(`users/${user.uid}/messages`).add(object);
  }

  dismissUserMessage(user:User, messageKey) {
    return this.afs.doc(`users/${user.uid}/messages/${messageKey}`).update({ 'dismissed': true });
  }



  // getGlobalMessages(): Observable<ToastMessage[]> {
  //   return this.afs.collection('messages').snapshotChanges().map(messages => {
  //     return messages.map(message => (<ToastMessage>{ $id: message.payload.doc.id, type: 'global', ...message.payload.doc.data() }));
  //   });
  // }
  // getLocalMessages(): Observable<ToastMessage[]> {
  //   return this.$messages;
  // }
  // saveGlobalMessage(content, style) {
  //   const message = new ToastMessage('global', content, style);
  //   const object = JSON.parse(JSON.stringify(message));
  //   return this.afs.collection('messages').add(object).then(doc => {
  //     console.log('message added!', doc)
  //   })
  // }

  // dismissGlobalMessage(messageKey) {
  //   return this.afs.doc(`messages/${messageKey}`).update({ 'dismissed': true }).then(doc => {
  //     console.log('message dismissed!', doc)
  //   })
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
