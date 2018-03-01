import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "@services/auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user$

    // activate subscription, do something, destroy subscription
      .take(1)

      // map to a boolean
      .map(user => !!(user && user.roles.admin))

      // execute this on observable value retrieval (do something)
      .do(isAdmin => {
        if(!isAdmin) {
          console.warn('Access Denied - you are not an admin!')
        }
      });
  }
}
