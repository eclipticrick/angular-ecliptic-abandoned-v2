import { Component, OnInit } from '@angular/core';
import {UserService} from "@services/user.service";
import {AuthService} from "@services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "@models/user";

@Component({
  selector: 'app-security-settings',
  templateUrl: './security.component.html',
  styleUrls: ['../settings.component.scss']
})
export class SecuritySettingsComponent implements OnInit {
  changePaswordForm: FormGroup;

  constructor(private auth: AuthService, private userSvc: UserService) { }

  ngOnInit() {
    this.changePaswordForm = new FormGroup({
      'oldPassword': new FormControl(
        null,
        //Validators.required
      ),
      'newPassword': new FormControl(
        null,
        //Validators.required
      ),
      'verifyPassword': new FormControl(
        null,
        //Validators.required
      )
    });

    // this.auth.user$.take(1).subscribe(user => {
    //   this.changePaswordForm.setValue({
    //     name: user.settings.theme.name,
    //     dark: user.settings.theme.dark
    //   });
    // });
  }

  onUpdatePassword(user: User) {
    console.log('Update password called! (not implemented yet!)')
    //user.settings.theme.name = this.changePaswordForm.value.name;
    //user.settings.theme.dark = this.changePaswordForm.value.dark;

    //const promise = this.userSvc.updateUser(user);
    //promise.then(
    //  _ => { console.log('user\'s theme updated successfully!') },
    //  err => { console.log(err, err.message) }
    //)
  }

}
