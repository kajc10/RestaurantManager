import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { NestAuthService } from "./nest-auth.service";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private nestAuthService: NestAuthService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.nestAuthService.getUser();
        if (currentUser) {
            if (route.data["admin"] && !currentUser.isAdmin) {
                this.router.navigate(['/foods']);
                return false;
            }
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}