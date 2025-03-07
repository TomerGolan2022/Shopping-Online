import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cities, City } from 'src/app/cities';
import CredentialsModel from 'src/app/models/credentials-model';
import UserModel from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear = true;

  public user = new UserModel();
  public credentials = new CredentialsModel();

  // cities: City[] = Cities;
  cities = ["Tel-Aviv", "Haifa", "Jerusalem", "Beer Sheva", "Ashdod", "Ashkelon", "Rishon LeZion", "Petah Tikva", "Netanya", "Ramat Gan", "Holon"];

  constructor(private authService: AuthService, private router: Router, private _formBuilder: FormBuilder) { }

  async ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
    this.firstFormGroup = this._formBuilder.group({
      identityNumberCtrl: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      usernameCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', [Validators.required, Validators.minLength(6)]],
      confirmPasswordCtrl: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: this.comparePasswords }
    );
    this.secondFormGroup = this._formBuilder.group({
      cityCtrl: ['', Validators.required],
      streetCtrl: ['', Validators.required],
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
    });
  }

  comparePasswords = (c: any) => {
    if (c.controls.confirmPasswordCtrl.value && c.controls.passwordCtrl.value) {
      const isPasswordsMatch = c.controls.passwordCtrl.value === c.controls.confirmPasswordCtrl.value;
      return isPasswordsMatch ? null : c.controls.confirmPasswordCtrl.setErrors({ passwordsNotMatching: true });;
    };
  }

  public async register() {
    try {
      await this.authService.register(this.user);
      alert("Welcome!");
      this.credentials.username = this.user.username;
      this.credentials.password = this.user.password;
      await this.authService.login(this.credentials);
      alert("You are logged in!");
      this.router.navigateByUrl("/");
    }
    catch (err: any) {
      alert(err.error);
    }
  }

}
