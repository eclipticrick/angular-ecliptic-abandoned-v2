import { Component, OnInit } from '@angular/core';
import { AuthService } from "@services/auth.service";
import { ToastService } from "@services/toast.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private auth: AuthService, private toast: ToastService) { }

  ngOnInit() {
  }

}
