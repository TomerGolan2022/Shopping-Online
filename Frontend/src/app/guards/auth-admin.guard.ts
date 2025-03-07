import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthAdminGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
        let isAuthenticated = this.authService.isAdmin();
        if (!isAuthenticated) {
            this.router.navigate(['/home']);
        }
        return isAuthenticated;
    }
}