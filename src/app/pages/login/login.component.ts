import { Component, OnInit } from '@angular/core';
import { AuthService } from "@services/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup;
  registerForm: FormGroup;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

    // login form setup
    this.signupForm = new FormGroup({
      'email': new FormControl(
        null,
        [ Validators.required, Validators.email ]
      ),
      'password': new FormControl(
        null,
        Validators.required
      )
    });

    // register form setup
    this.registerForm = new FormGroup({
      'email': new FormControl(
        null,
        [ Validators.required, Validators.email ]
      ),
      'password': new FormControl(
        null,
        [ Validators.required, this.passwordValidator.bind(this) ]
      ),
      'verify_password': new FormControl(
        null,
        [ Validators.required, this.passwordConfirmationValidator.bind(this) ]
      )
    })
  }

  onLogin(){
    const promise = this.auth.emailLogin(this.signupForm.value.email, this.signupForm.value.password);
    promise.then(
      _ => {
        console.log('successful email login');

      },
      err => console.warn(err, err.message)
    )
  }
  onRegister(){
    const promise = this.auth.emailRegister(this.registerForm.value.email, this.registerForm.value.password)
    promise.then(
      _ => console.log('successful email register'),
      err => console.warn(err, err.message)
    )
  }
  onProviderLogin(type:string) {
    let promise;
    if (type === 'facebook')     promise = this.auth.facebookLogin();
    else if (type === 'twitter') promise = this.auth.twitterLogin();
    else if (type === 'github')  promise = this.auth.githubLogin();
    else if (type === 'google')  promise = this.auth.googleLogin();
    promise.then(
      _ => console.log('successful provider login'),
      err => console.warn(err, err.message)
    )
  }

  passwordValidator(c: FormControl): {[s: string]:boolean}{
    let errors = {};
    if(this.registerForm){
      if(c.value){

        let onlyLowercase = true;
        let onlyUppercase = true;
        for (let i = 0; i < c.value.length; i++) {
          if(onlyLowercase && !(c.value[i] >= 'a' && c.value[i] <= 'z'))
            onlyLowercase = false;
          if(onlyUppercase && !(c.value[i] >='A' && c.value[i] <= 'Z'))
            onlyUppercase = false;
        }
        if(onlyLowercase) errors['onlyLowercase'] = true;
        if(onlyUppercase) errors['onlyUppercase'] = true;
        if(Number(c.value)) errors['onlyNumbers'] = true;

        if(c.value.length < 6) errors['tooShort'] = true;
        if(c.value.length > 255) errors['tooLong'] = true;
        if(c.value === this.registerForm.get('email').value){
          errors['sameAsEmail'] = true;
        }
      }
    }
    if(errors) return errors;
    return null;
  }

  passwordConfirmationValidator(control: FormControl): {[s: string]:boolean}{
    let errors = {};
    if(this.registerForm){
      if(this.registerForm.get('password')){
        if(control.value !== this.registerForm.get('password').value){
          errors['noMatch'] = true;
        }
      }
    }
    if(errors) return errors;
    return null;
  }

}
