import { Component, OnInit } from '@angular/core';
import { AuthService } from "@services/auth.service";
import { ToastService } from "@services/toast.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService, private toast: ToastService) { }

  ngOnInit() {
  }

}
