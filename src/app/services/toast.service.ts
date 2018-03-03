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
export class ToastService {

  private _localMessages: ToastMessage[] = [];

  private _userMessagesCollection: AngularFirestoreCollection<ToastMessage>;
  private _userMessagesSnapshotChanges$: any;
  private _userMessagesSubscription: Subscription;
  private _userMessages$ = new Subject<ToastMessage[]>();

  localMessages$ = new Subject<ToastMessage[]>();
  messages$: Observable<ToastMessage[]>;

  constructor(private afs: AngularFirestore, private auth: AuthService) {

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
              return new ToastMessage(object.type, new Date(object.date), object.content, object.style, object.canNotBeDismissed, snap.payload.doc.id);
            });
          });


        // set initial (and get latest) observables so they can be merged
        this._userMessagesSubscription = this._userMessagesSnapshotChanges$.subscribe(userMessages => {
          this._userMessages$.next(userMessages.slice());
          this.update();
        })
      }
      else {
        // unsubscribe to userMessages on logout
        if(this._userMessagesSubscription) {
          this._userMessagesSubscription.unsubscribe();

          // clear alerts on logout
          this._localMessages = [];
          this.localMessages$.next(this._localMessages.slice());
        }
      }
    });
  }
  update() {
    // send next observable value for local messages
    this.localMessages$.next(this._localMessages.slice());

    // merge next value with userMessages observable (if the user is logged in)
    this.auth.user$.subscribe(user => {
      if(user) this.mergeObservables();
      else this.messages$ = this.localMessages$
    })
  }
  mergeObservables(){
    this.messages$ = Observable.combineLatest(
      this.localMessages$,
      this._userMessages$,
      (localMessages, userMessages)=> {
        return [...localMessages, ...userMessages]
      });
  }





  info(message, user?:User, canNotBeDismissed?:boolean) {
    if(user) this.saveUserMessage(user, 'info', message, canNotBeDismissed);
    else this.addSessionMessage('info', message)
  }
  success(message, user?:User, canNotBeDismissed?:boolean) {
    if(user) this.saveUserMessage(user, 'success', message, canNotBeDismissed);
    else this.addSessionMessage('success', message)
  }
  warning(message, user?:User, canNotBeDismissed?:boolean) {
    if(user) this.saveUserMessage(user, 'warning', message, canNotBeDismissed);
    else this.addSessionMessage('warning', message)
  }
  danger(message, user?:User, canNotBeDismissed?:boolean) {
    if(user) this.saveUserMessage(user, 'danger', message, canNotBeDismissed);
    else this.addSessionMessage('danger', message)
  }
  primary(message, user?:User, canNotBeDismissed?:boolean) {
    if(user) this.saveUserMessage(user, 'primary', message, canNotBeDismissed);
    else this.addSessionMessage('primary', message)
  }
  secondary(message, user?:User, canNotBeDismissed?:boolean) {
    if(user) this.saveUserMessage(user, 'secondary', message, canNotBeDismissed);
    else this.addSessionMessage('secondary', message)
  }
  light(message, user?:User, canNotBeDismissed?:boolean) {
    if(user) this.saveUserMessage(user, 'light', message, canNotBeDismissed);
    else this.addSessionMessage('light', message)
  }
  dark(message, user?:User, canNotBeDismissed?:boolean) {
    if(user) this.saveUserMessage(user, 'dark', message, canNotBeDismissed);
    else this.addSessionMessage('dark', message)
  }

  private saveUserMessage(user:User, style, content, canNotBeDismissed:boolean = false) {
    const message = new ToastMessage('user', new Date(), content, style, canNotBeDismissed);
    const object = JSON.parse(JSON.stringify(message));
    this.afs.collection(`users/${user.uid}/messages`).add(object);
  }
  private addSessionMessage(style, content) {
    const message = new ToastMessage('local', new Date(), content, style, false);
    this._localMessages.push(message);

    this.update();
  }
  removeUserMessage(user:User, messageKey) {
    this.afs.doc(`users/${user.uid}/messages/${messageKey}`).delete();
  }
  removeSessionMessage(messageDate) {
    let index = 0;
    this._localMessages.forEach(message => {
      if(message.date === messageDate) return;
      index++;
    });
    this._localMessages.splice(index, 1);
    this.update();
  }

}
