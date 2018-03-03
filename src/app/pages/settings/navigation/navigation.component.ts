import { Component, OnInit } from '@angular/core';
import {UserService} from "@services/user.service";
import {AuthService} from "@services/auth.service";
import {ToastService} from "@services/toast.service";

@Component({
  selector: 'app-navigation-settings',
  templateUrl: './navigation.component.html',
  styleUrls: ['../settings.component.scss']
})
export class NavigationSettingsComponent implements OnInit {

  constructor(private auth: AuthService, private userSvc: UserService, private toast: ToastService) { }

  ngOnInit() {
  }

}
