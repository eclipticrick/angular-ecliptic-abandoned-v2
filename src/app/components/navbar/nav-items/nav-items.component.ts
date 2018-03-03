import { Component, OnInit } from '@angular/core';
import {AuthService} from "@services/auth.service";

@Component({
  selector: 'app-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['./nav-items.component.scss']
})
export class NavItemsComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
