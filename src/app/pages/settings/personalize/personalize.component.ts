import { Component, OnInit } from '@angular/core';
import { UserService } from "@services/user.service";
import { AuthService } from "@services/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {User} from "@models/user";

@Component({
  selector: 'app-personalize-settings',
  templateUrl: './personalize.component.html',
  styleUrls: ['../settings.component.scss']
})
export class PersonalizeSettingsComponent implements OnInit {

  updateThemeForm: FormGroup;

  constructor(private auth: AuthService, private userSvc: UserService) { }

  ngOnInit() {
    this.updateThemeForm = new FormGroup({
      'name': new FormControl(
        null,
        Validators.required
      ),
      'dark': new FormControl(
        null,
        Validators.required
      )
    });

    this.auth.user$.take(1).subscribe(user => {
      this.updateThemeForm.setValue({
        name: user.settings.theme.name,
        dark: user.settings.theme.dark
      });
    });
  }

  onUpdate(user: User) {
    user.settings.theme.name = this.updateThemeForm.value.name;
    user.settings.theme.dark = this.updateThemeForm.value.dark;

    const promise = this.userSvc.updateUser(user);
    promise.then(
      _ => { console.log('user\'s theme updated successfully!') },
      err => { console.log(err, err.message) }
    )
  }

}
