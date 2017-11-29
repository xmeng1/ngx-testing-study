import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  needsLogin = true;

  @Output() loggedIn = new EventEmitter<User>();
  @Input() enabled = true;

  form: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder) {
  }

  ngOnInit() {
    // this.auth.isAuthenticated().then((authenticated) => {
    //   this.needsLogin = !authenticated;
    // });

    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)]],
    });
  }

  needsLoginOld() {
    return !this.auth.isAuthenticatedOld();
  }

  // login(email, password) {
  //   console.log(`Login ${email} ${password}`);
  //   if (email && password) {
  //     console.log(`Emitting`);
  //     this.loggedIn.emit(new User(email, password));
  //   }
  // }

  login() {
    console.log(`Login ${this.form.value}`);
    if (this.form.valid) {
      this.loggedIn.emit(
        new User(
          this.form.value.email,
          this.form.value.password
        )
      );
    }
  }
}
