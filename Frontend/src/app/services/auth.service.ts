import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import CredentialsModel from '../models/credentials-model';
import Role from '../models/role-model';
import UserModel from '../models/user-model';
import { loginAction, logoutAction, registerAction } from '../redux-ngrx/auth-state';
import store from '../redux-ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  // Register:
  public async register(user: UserModel): Promise<UserModel> {
    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("username", user.username);
    formData.append("identifyNumber", user.identifyNumber.toString());
    formData.append("password", user.password);
    formData.append("city", user.city);
    formData.append("street", user.street);
    const observable = this.http.post<UserModel>(environment.registerUrl, formData)
    const addedUser = await firstValueFrom(observable);
    return addedUser;
  }

  // Login:
  public async login(credentials: CredentialsModel): Promise<void> {
    const formData = new FormData();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);
    const observable = this.http.post<string>(environment.loginUrl, formData)
    const token = await firstValueFrom(observable);
    localStorage.setItem("token", token);
    store.dispatch(loginAction(token));
  }

  // Logout
  public logout(): void {
    store.dispatch(logoutAction());
  }

  // Is Logged in
  public isLoggedIn(): boolean {
    return store.getState().authState.user !== null;
  }

  // Is Admin
  public isAdmin(): boolean {
    return store.getState().authState.user.role === Role.Admin;
  }
  
}

