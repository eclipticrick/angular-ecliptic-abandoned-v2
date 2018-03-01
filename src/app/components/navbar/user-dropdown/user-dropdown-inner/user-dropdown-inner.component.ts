import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from "@services/auth.service";

@Component({
  selector: 'app-user-dropdown-inner',
  template: `

      <a class="dropdown-item dropdown-item-user">
        <img [src]="user.photoURL" />
        <span class="displayName">{{ user.displayName }}</span>
        <span class="email">{{ user.email }}</span>
      </a>
      <hr class="dropdown-divider">
      <a class="dropdown-item" [routerLink]="['/profile', user.uid]"><fa name="user"></fa> Profile</a>
      <a class="dropdown-item" routerLink="/settings"><fa name="cog"></fa> Settings</a>
      <hr class="dropdown-divider">
      <a class="dropdown-item" (click)="onSignOut()">
        <fa name="sign-out"></fa> Sign-out
      </a>

  `,
  styleUrls: ['./user-dropdown-inner.component.scss']
})
export class UserDropdownInnerComponent implements OnInit {
  @Input('user') user;

  constructor(private auth: AuthService) { }

  ngOnInit() { }

  onSignOut() {
    this.auth.signOut();
  }
}
