import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private authSrvc:AuthService,private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return this.authSrvc.currentUser.pipe(take(1), map(user => {
            // return !!user

        const isAuth = !!user;
        if(isAuth) return true;

        return this.router.createUrlTree(['/auth'])
        }), tap(isAuth => {
            // !isAuth ? this.router.navigate(['/auth']) : '';
        }))
    }
}