import { Component, OnInit } from '@angular/core';
import {UserService} from "@services/user.service";
import {AuthService} from "@services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "@models/user";

@Component({
  selector: 'app-homepage-settings',
  templateUrl: './homepage.component.html',
  styleUrls: ['../settings.component.scss']
})
export class HomepageSettingsComponent implements OnInit {

  updateHomepageForm: FormGroup;

  constructor(private auth: AuthService, private userSvc: UserService) { }

  ngOnInit() {
    this.updateHomepageForm = new FormGroup({
      'toggleSearchbar': new FormControl(
        null,
        Validators.required
      ),
      'searchbarType': new FormControl(
        null,
        Validators.required
      ),
      'toggleShortcuts': new FormControl(
        null,
        Validators.required
      ),
      'toggleRecent': new FormControl(
        null,
        Validators.required
      ),
      'widgetTopLeft': new FormControl(
        null,
        Validators.required
      ),
      'widgetTopRight': new FormControl(
        null,
        Validators.required
      ),
      'widgetBottomLeft': new FormControl(
        null,
        Validators.required
      ),
      'widgetBottomRight': new FormControl(
        null,
        Validators.required
      )
    });

    this.auth.user$.take(1).subscribe(user => {
      this.updateHomepageForm.setValue({
        toggleSearchbar:   user.settings.homepage.searchbar.display,
        searchbarType:     user.settings.homepage.searchbar.type,
        toggleShortcuts:   user.settings.homepage.shortcuts.display,
        toggleRecent:      user.settings.homepage.recent.display,
        widgetTopLeft:     user.settings.homepage.widgets.topLeft,
        widgetTopRight:    user.settings.homepage.widgets.topRight,
        widgetBottomLeft:  user.settings.homepage.widgets.bottomLeft,
        widgetBottomRight: user.settings.homepage.widgets.bottomRight
      });
    });
  }

  onUpdate(user: User) {
    user.settings.homepage.searchbar.display   = this.updateHomepageForm.value.toggleSearchbar;
    user.settings.homepage.searchbar.type      = this.updateHomepageForm.value.searchbarType;
    user.settings.homepage.shortcuts.display   = this.updateHomepageForm.value.toggleShortcuts;
    user.settings.homepage.recent.display      = this.updateHomepageForm.value.toggleRecent;
    user.settings.homepage.widgets.topLeft     = this.updateHomepageForm.value.widgetTopLeft;
    user.settings.homepage.widgets.topRight    = this.updateHomepageForm.value.widgetTopRight;
    user.settings.homepage.widgets.bottomLeft  = this.updateHomepageForm.value.widgetBottomLeft;
    user.settings.homepage.widgets.bottomRight = this.updateHomepageForm.value.widgetBottomRight;

    const promise = this.userSvc.updateUser(user);
    promise.then(
      _ => { console.log('user\'s homepage settings updated successfully!') },
      err => { console.log(err, err.message) }
    )
  }

}
