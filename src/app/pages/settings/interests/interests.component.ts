import { Component, OnInit } from '@angular/core';
import {UserService} from "@services/user.service";
import {AuthService} from "@services/auth.service";
import {UserInterest} from "@models/user";

@Component({
  selector: 'app-interests-settings',
  templateUrl: './interests.component.html',
  styleUrls: ['../settings.component.scss']
})
export class InterestsSettingsComponent implements OnInit {
  interests = {};
  interestsList: UserInterest[];
  constructor(private auth: AuthService, private userSvc: UserService) { }

  ngOnInit() {
    this.interestsList = [
      {
        active: true,
        name: 'crypto',
        link: '/crypto',
        sidenavPosition: 2000
      }
    ];

    this.interests['crypto'] = this.isEnabled('crypto');
    this.interests['learning'] = this.isEnabled('learning');
    this.interests['about'] = this.isEnabled('about');
    //active: boolean;
    //name: string;
    //link: string;
    //display: {
    //  name: string;
    //  inNavbar: boolean;
    //  inSidemenu: boolean;
    //}
  }

  isEnabled(name:string):boolean{
    let enabled = false;
    this.interestsList.forEach((interest) => {
      if(interest.name === name)
        enabled = interest.active;
    });
    return enabled;
  }

}
