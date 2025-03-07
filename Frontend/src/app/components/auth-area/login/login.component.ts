import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import CredentialsModel from 'src/app/models/credentials-model';
import UserModel from 'src/app/models/user-model';
import store from 'src/app/redux-ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { HomeComponent } from '../../home-area/home/home.component';
import { HeaderComponent } from '../../layout-area/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public credentials = new CredentialsModel();

  constructor(private authService: AuthService, private router: Router, private _formBuilder: FormBuilder, private home: HomeComponent) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      usernameCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public async login() {
    try {
      await this.authService.login(this.credentials);
      alert("You Are Logged In!");
      this.router.navigateByUrl("/");
    }
    catch (err: any) {
      alert(err.error);
    }
  }

}
