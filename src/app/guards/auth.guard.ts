import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {Location} from '@angular/common';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private location: Location) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user$

    // activate subscription, do something, destroy subscription
      .take(1)

      // map to a boolean
      .map(user => !!(user))

      // execute this on observable value retrieval (do something)
      .do(isLoggedIn => {
        if(!isLoggedIn) {
          console.warn('You must be logged in to perform this action!');
          //this.location.back();
          this.router.navigate(['/login'])
        }
      });
  }
}
