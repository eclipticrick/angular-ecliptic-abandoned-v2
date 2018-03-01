import { Component, OnInit } from '@angular/core';
import { UserService } from "@services/user.service";
import { AuthService } from "@services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "@models/user";
import { MatDialog } from "@angular/material";
import {DialogEditPictureComponent} from "./dialog-edit-picture/dialog-edit-picture.component";
import 'rxjs/add/operator/take';
import {FireToastService} from "@services/fire-toast.service";
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';

@Component({
  selector: 'app-profile-settins',
  templateUrl: './profile.component.html',
  styleUrls: ['../settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  updateProfileForm: FormGroup;

  constructor(private auth: AuthService, private userSvc: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.updateProfileForm = new FormGroup({
      'privateEmail': new FormControl(
        null,
        Validators.required
      ),
      'displayName': new FormControl(
        null,
        [ Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z0-9 _.-]*$") ] //TODO: make sure not only spaces
      ),
      'about': new FormControl(
        null //,
        //Validators.pattern("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")
      )
    });

    // ONLY LETTERS:                    [a-zA-Z][a-zA-Z ]+
    // LETTERS NUMBERS & UNDERSCORES:   ^[a-zA-Z0-9_.-]*$
    // LETTERS NUMBERS AND SPACES       ^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$
    this.auth.user$.take(1).subscribe(user => {
      this.updateProfileForm.setValue({
        privateEmail: user.privateEmail,
        displayName: user.displayName,
        about: user.about
      });
    });

  }

  openEditPictureDialog(): void {
    this.dialog.open(DialogEditPictureComponent);
  }


  onUpdate(user: User) {
    user.privateEmail = this.updateProfileForm.value.privateEmail;
    user.displayName = this.updateProfileForm.value.displayName;
    user.about = this.updateProfileForm.value.about;

    const promise = this.userSvc.updateUser(user);
    promise.then(
      _ => {
        console.log('user updated successfully!');
      },
      err => { console.log(err, err.message) }
    )
  }
}
