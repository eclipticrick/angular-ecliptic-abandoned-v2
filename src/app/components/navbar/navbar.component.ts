import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { collapseAnimation } from "../../app.animations";
import { AuthService } from "@services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    collapseAnimation
  ]
})
export class NavbarComponent implements OnInit {
  @Output() onToggleSidenav: EventEmitter<void> = new EventEmitter<void>();
  collapse:string = 'closed';

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  toggleCollapse() {
    this.collapse = this.collapse == 'open' ? 'closed' : 'open';
  }

  toggleSidenav() {
    this.onToggleSidenav.emit();
  }
}
