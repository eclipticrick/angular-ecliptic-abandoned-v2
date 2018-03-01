import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {User} from "@models/user";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import {AuthService} from "./auth.service";

@Injectable()
export class UserService {
  constructor(private afStore: AngularFirestore) { }      //, private auth: AuthService

  getUser(uid:string): Observable<User> {
    return this.afStore.doc<User>(`users/${uid}`).valueChanges();
  }

  updateUser(newUser: User){

    //TODO: setup write rule in firestore so logged in user can only edit own document   (test @ profile page with diffrent userID?)
    return this.afStore.doc<User>(`users/${newUser.uid}`).set(newUser, {merge: true})
  }

  //getUser(uid:string): Observable<User> {
  //  let userRef: AngularFirestoreCollection<User> = this.afStore.collection('users', ref => {
  //    return ref.where('uid', '==', uid)
  //  });
  //  return userRef.valueChanges().map(users => users[0])
  //}
  //setters (roles, intrests, profile picture?, )



  // getCollectionOrderby(name, orderby): AngularFirestoreCollection<any> {
  //   return this.afs.collection(name, ref => {
  //     return ref.orderBy(orderby)
  //   });
  // }
}
