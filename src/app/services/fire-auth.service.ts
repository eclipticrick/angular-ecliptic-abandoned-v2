import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { User } from "@models/user";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

@Injectable()
export class FireAuthService {
  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) {}

  getAuthData():Observable<User> {

    // get auth data (fireauth), then get firestore data - User || null
    return this.afAuth.authState.switchMap(user => {
      if(user) return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
      else return Observable.of(null);
    })
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  emailLogin(email: string, password: string) {
    const promise = this.afAuth.auth.signInWithEmailAndPassword(email, password);
    promise.then(
      userObject => this.updateUserDataFromFireAuth(userObject, 'email'),
      error => { /* not handled here */ }
    );
    return promise;
  }
  emailRegister(email: string, password: string) {
    const promise =  this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    promise.then(
      userObject => this.updateUserDataFromFireAuth(userObject, 'email'),
      error => { /* not handled here */ }
    );
    return promise;
  }
  emailSendResetPasswordMail(email){
    return this.afAuth.auth.sendPasswordResetEmail(email)
  }

  login(type:string){
    let provider;
    if (type === 'facebook')     provider = new firebase.auth.FacebookAuthProvider();
    else if (type === 'twitter') provider = new firebase.auth.TwitterAuthProvider();
    else if (type === 'github')  provider = new firebase.auth.GithubAuthProvider();
    else if (type === 'google')  provider = new firebase.auth.GoogleAuthProvider();

    return this.oAuthLogin(provider, type);
  }

  private oAuthLogin(provider, type) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserDataFromFireAuth(credential.user, type)
    })
  }

  static getInitialUserObject():User {
    return {
      uid: '',
      email: '',
      loginType: '',
      privateEmail: true,
      about: 'I don\'t like filling out forms!',
      roles: {
        betaTester: false,
        verified: false,
        admin: false,
        debug: false,
        vip: false
      },
      interests: [],
      settings: {
        theme: {
          name: 'default',
          dark: false
        },
        homepage: {
          searchbar: {
            display: true,
            type: 'google',
          },
          shortcuts: {
            display: false,
            links: []
          },
          recent: {
            display: false,
            links: []
          },
          widgets: {
            topLeft: 'none',
            topRight: 'none',
            bottomLeft: 'none',
            bottomRight: 'none'
          },
          navbarLinks: [
            { index: 0,    display: true, name: 'Home',     link: '/' },
            { index: 1000, display: true, name: 'Settings', link: '/settings' }
          ]
        }
      }
    };
  }

  private updateUserDataFromFireAuth(afUser, loginType:string): Promise<any> {

    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${afUser.uid}`);

    return userRef
      .ref
      .get()
      .then(doc => {

        // if user does not exist yet
        if (!doc.exists) {

          // get initial user object
          let data: User = FireAuthService.getInitialUserObject();

          // set values from fire-auth login
          data.uid = afUser.uid;
          data.email = afUser.email;
          data.loginType = loginType;
          if(loginType !== 'email'){
            console.log(data);
            //TODO: get verified state here?

            // set more data from fire-auth if the user did not login with email
            data.displayName = afUser.displayName;
            data.photoURL = afUser.photoURL;
          }
          else {
            // is the user logged in with email, set a temporary displayName and photoURL
            data.displayName = afUser.email.substr(0, afUser.email.indexOf('@'));
            data.photoURL = 'https://firebasestorage.googleapis.com/v0/b/ecliptic-bc4ef.appspot.com/o/images%2Funknown.jpg?alt=media&token=233b7fb2-c98d-433e-a83c-29a54d6e4ed7';
          }

          // create the firestore document for the new user
          let setRegisterPromise = userRef.set(data);
          setRegisterPromise.then(
            s => { console.log('REGISTER: Document created!') },
            e => { console.log('REGISTER: !!ERROR!!', e) }
          )
        }
        else {
          // get current user data
          let data:User = <User>doc.data();

          // set email from fire-auth login //TODO: not nessecary  if email-change is impossible
          data.email = afUser.email;

          if(loginType !== 'email'){

            // set more data from fire-auth if the user did not login with email
            data.displayName = afUser.displayName;
            data.photoURL = afUser.photoURL;
          }


          let setLoginPromise = userRef.set(data, {merge: true}); //
          setLoginPromise.then(
            s => { console.log('LOGIN: Document updated!') },
            e => { console.log('LOGIN: !!ERROR!!', e) }
          )
        }
      })
      // .catch(err => {
      //   console.log('[updateUserDataFromFireAuth]', err);
      // });
  }

  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.uid}`);
    console.log('updateUserData(user)');
    console.log('updated user: ', user);

    // merge true (so that existing values do not get overwritten)
    return userRef.set(user, { merge: true })
  }


}
