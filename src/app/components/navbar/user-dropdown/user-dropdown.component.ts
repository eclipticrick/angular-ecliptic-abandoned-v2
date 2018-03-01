import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "@services/auth.service";

@Component({
  selector: 'app-user-dropdown',
  template: `
    
    <div *ngIf="type == 'li'; then liTemplate else divTemplate"></div>
  
    <ng-template #liTemplate>
      <li *ngIf="auth.user$ | async as user" class="nav-item dropdown user-dropdown {{ display }}" ngbDropdown>
        <a class="nav-link dropdown-toggle" ngbDropdownToggle><img [src]="user.photoURL"></a>
        <div class="dropdown-menu" ngbDropdownMenu>
            <app-user-dropdown-inner [user]="user"></app-user-dropdown-inner>
        </div>
        <!--
        <a class="nav-link dropdown-toggle" ngbDropdownToggle><img [src]="user.photoURL"></a>
        <div class="dropdown-menu" ngbDropdownMenu>
          <a class="dropdown-item">{{ user.displayName }} </a>
          <a class="dropdown-item">Another action</a>
          <hr class="dropdown-divider">
          <a class="dropdown-item" (click)="auth.signOut()"><fa name="sign-out"></fa> Sign-out</a>
        </div>
        -->
        
      </li>
    </ng-template>
    
    <ng-template #divTemplate>
      <div *ngIf="auth.user$ | async as user" class="nav-item dropdown user-dropdown {{ display }}" ngbDropdown>
        <a class="nav-link dropdown-toggle" ngbDropdownToggle><img [src]="user.photoURL"></a>
        <div class="dropdown-menu" ngbDropdownMenu>
          <app-user-dropdown-inner [user]="user"></app-user-dropdown-inner>
        </div>
        <!--
        <a class="nav-link dropdown-toggle" ngbDropdownToggle><img [src]="user.photoURL"></a>
        <div class="dropdown-menu" ngbDropdownMenu>
          <a class="dropdown-item">{{ user.displayName }} </a>
          <a class="dropdown-item">Another action</a>
          <hr class="dropdown-divider">
          <a class="dropdown-item" (click)="auth.signOut()"><fa name="sign-out"></fa> Sign-out</a>
        </div>
        -->
      </div>
    </ng-template>

  
  `,
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent implements OnInit {
  @Input('type') type;
  @Input('display') display;

  constructor(private auth: AuthService) { }

  ngOnInit() { }

}
