import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { User } from "@models/user";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import {FireAuthService} from "./fire-auth.service";

@Injectable()
export class AuthService {

  user$: Observable<User>;

  constructor(private router: Router, private fireAuthService: FireAuthService) {

    // get auth data, then get firestore - User || null
    this.user$ = fireAuthService.getAuthData()
  }

  isVIP(user: User):boolean{
    const allowed = ['vip'];
    return AuthService.checkRole(user, allowed)
  }
  isVerified(user: User):boolean{
    const allowed = ['verified'];
    return AuthService.checkRole(user, allowed)
  }
  isAdmin(user: User):boolean{
    const allowed = ['admin'];
    return AuthService.checkRole(user, allowed)
  }
  isBetaTester(user: User):boolean{
    const allowed = ['betaTester'];
    return AuthService.checkRole(user, allowed)
  }

  private static checkRole(user: User, allowedRoles: string[]):boolean{
    if(!user) return false;
    for(const role of allowedRoles) {
      if(user.roles[role]){
        return true;
      }
    }
  }

  signOut() {
    this.fireAuthService.signOut();
    this.router.navigate(['/'])
  }
  emailLogin(email, password) {
    const promise = this.fireAuthService.emailLogin(email, password);
    return this.navigateHomeIfLoginWasSuccess(promise);
  }
  emailRegister(email, password) {
    const promise = this.fireAuthService.emailRegister(email, password);
    return this.navigateHomeIfLoginWasSuccess(promise);
  }
  emailSendResetPasswordMail(email) {
    return this.fireAuthService.emailSendResetPasswordMail(email);
  }
  facebookLogin(){
    const promise = this.fireAuthService.login('facebook');
    return this.navigateHomeIfLoginWasSuccess(promise);
  }
  twitterLogin(){
    const promise = this.fireAuthService.login('twitter');
    return this.navigateHomeIfLoginWasSuccess(promise);
  }
  githubLogin(){
    const promise = this.fireAuthService.login('github');
    return this.navigateHomeIfLoginWasSuccess(promise);
  }
  googleLogin() {
    const promise = this.fireAuthService.login('google');
    return this.navigateHomeIfLoginWasSuccess(promise);
  }
  private navigateHomeIfLoginWasSuccess(promise:Promise<any>):Promise<any>{
    promise.then(
      success => this.router.navigate(['/'])
    );
    return promise
  }
}
