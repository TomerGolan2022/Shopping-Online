import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Role from 'src/app/models/role-model';
import UserModel from 'src/app/models/user-model';
import store from 'src/app/redux-ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../../auth-area/login/login.component';
import { HomeComponent } from '../../home-area/home/home.component';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Supermarket Online 🛒';
  currentRoute = "/";

  public user = new UserModel();
  isAdmin = false;
  isCustomer = false;

  constructor(public dialog: MatDialog, private router: Router, private authService: AuthService, private home: HomeComponent) { }

  async ngOnInit() {
    this.user = store.getState().authState.user;
    if (this.user) {
      if (this.user.role === Role.Admin) this.isAdmin = true;
      if (this.user.role === Role.Customer) this.isCustomer = true;
    }
  }

  public async logout() {
    try {
      this.authService.logout();
      this.user = null;
      alert("You have been successfully logged-out");
      this.router.navigateByUrl("/");
     
    }
    catch (err: any) {
      alert(err.error);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent);
  }

}
