import { Component, OnInit } from '@angular/core';
import {AuthService} from "@services/auth.service";
import {FireToastService} from "@services/fire-toast.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService, private toast: FireToastService) { }

  ngOnInit() {
  }

}
