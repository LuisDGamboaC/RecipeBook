// protegeremos las rutas para que madie pueda enmtrar sin estar autenticado

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";

//tprotegemos las rutas para que nadie entre si no esta autorizado
@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {

    constructor(private aurthService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): boolean | Promise<boolean> | Observable<boolean | UrlTree>
        {
         return this.aurthService.users.pipe(
            take(1),
            map(user => {
            const isAuth = !!user;
            if(isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/auth']); // redireccionamos
         }));
    }
}