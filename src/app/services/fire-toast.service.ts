import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
//import { Observable } from "rxjs/Observable";
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs/Rx'
import { ToastMessage } from "@models/toast-message";
import { User } from "@models/user";
import 'rxjs/add/operator/map';
import "rxjs/add/observable/of";
import * as firebase from "firebase/app";
import {AuthService} from "@services/auth.service";

@Injectable()
export class FireToastService {

  private _localMessages$ = new Subject<ToastMessage[]>();
  private _localMessages: ToastMessage[] = [];

  private _userMessagesCollection: AngularFirestoreCollection<ToastMessage>;
  private _userMessagesSnapshotChanges$: any;
  private _userMessagesSubscription: Subscription;
  private _userMessages$ = new Subject<ToastMessage[]>();

  messages$: Observable<ToastMessage[]>;

  // userMessages$: Observable<ToastMessage[]>; // THIS IS: Observable<ToastMessage[]>; (can't cast because of typescript valdation error)
  // messages$: Observable<ToastMessage[]> = Observable.create(
  //   x => console.log('onNext: %s', x),
  //   e => console.log('onError: %s', e),
  //   () => console.log('onCompleted')
  // );

  constructor(private afs: AngularFirestore, auth: AuthService) {

    // initialize empty 'complete' observable
    this.mergeObservables();

    // when user is logged in
    auth.user$.subscribe(user => {
      if(user){
        // access user-messages collection
        this._userMessagesCollection = this.afs.collection(`users/${user.uid}/messages`);

        // create user-messages SnapshotChanges Observable & map to ToastMessage[]
        this._userMessagesSnapshotChanges$ = this._userMessagesCollection.snapshotChanges()
          .map(arr => {
            return <ToastMessage[]>arr.map(snap => {
              const object = snap.payload.doc.data();
              return new ToastMessage(object.type, new Date(object.date), object.content, object.style, snap.payload.doc.id);
            });
          });


        // set initial (and get latest) observables so they can be merged
        this._userMessagesSubscription = this._userMessagesSnapshotChanges$.subscribe(userMessages => {
          this._userMessages$.next(userMessages.slice());
          this.updateLocalAndMergeObservables();
        })
      }
      else {
        console.log('FireToastService: no user is logged in at the moment!');
        // this._localMessages$.unsubscribe();
        // this._userMessages$.unsubscribe();
        if(this._userMessagesSubscription) this._userMessagesSubscription.unsubscribe();

        // TODO: maybe?: probably not?: because needed when no user is logged in
        // this._localMessages = [];
        // this._localMessages$.next(this._localMessages.slice());
      }


    });
  }
  updateLocalAndMergeObservables() {
    // send next observable value
    this._localMessages$.next(this._localMessages.slice());

    // merge next value with userMessages observable
    this.mergeObservables();
  }
  mergeObservables(){

    // combine with userMessages
    this.messages$ = Observable.combineLatest(
      this._localMessages$,
      this._userMessages$,
      (localMessages, userMessages)=> {
        //console.log('mergeObservables: localMessages:', localMessages);
        //console.log('mergeObservables: userMessages:', userMessages);
        //if(localMessages && userMessages)
        return [...localMessages, ...userMessages]
      });
    //this.messages$ = Observable.merge(this.localMessages$.asObservable(), this.userMessages$);
  }



  saveUserMessage(user:User, style, content) {
    const message = new ToastMessage('user', new Date(), content, style);
    const object = JSON.parse(JSON.stringify(message));
    this.afs.collection(`users/${user.uid}/messages`).add(object);
  }

  removeUserMessage(user:User, messageKey) {
    this.afs.doc(`users/${user.uid}/messages/${messageKey}`).delete();
  }
  saveLocalMessage(style, content) {
    const message = new ToastMessage('local', new Date(), content, style);
    this._localMessages.push(message);

    this.updateLocalAndMergeObservables();
  }
  removeLocalMessage(messageDate) {
    console.log('messageDate: ', messageDate)
    let index = 0;
    this._localMessages.forEach(message => {
      console.log('loop: ', message);
      if(message.date === messageDate){
        console.log('found', message);
        console.log('at index:', index);
        return;
      }
      index++;
    });
    this._localMessages.splice(index, 1)
    this.updateLocalAndMergeObservables();
  }


  // getMessages(user?:User) {
  //   return this.userMessages$
  //   // let messages = this.messages$;
  //   // if(user) messages = Observable.merge(messages, this.getUserMessages(user.uid));
  //   // return messages

  //   //if(user) this.messages$.merge(this.getUserMessages(user.uid));
  //   //return this.messages$;
  // }
  // getUserMessages(userId) { //: Observable<ToastMessage[]>
  //   // this.afs.collection(`users/${userId}/messages`).snapshotChanges().subscribe(res => {
  //   //   console.log('snapshotChanges:')
  //   //   console.log(res)
  //   // })
  //   // this.afs.collection(`users/${userId}/messages`).valueChanges().subscribe(res => {
  //   //   console.log('valueChanges:')
  //   //   console.log(res)
  //   // })
  //   // return this.afs.collection(`users/${userId}/messages`).snapshotChanges().map(snapshots => {
  //   //   console.log('snapshots:')
  //   //   console.log(snapshots)
  //   //   let objects = snapshots.map(snapshot => (<ToastMessage>{ $id: snapshot.payload.doc.id, type: 'user', ...snapshot.payload.doc.data() }));
  //   //   console.log('objects:')
  //   //   console.log(objects)
  //   //   let messages:ToastMessage[] = [];
  //   //   if(objects)
  //   //     objects.forEach(obj => messages.push(new ToastMessage(obj.type, obj.date, obj.content, obj.style, obj.$id)));
  //   //   console.log('messages:')
  //   //   console.log(messages)
  //   //   console.log('\n\n\n')
  //   //   return messages
  //   // })
  // }



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
