import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ROLE } from '../../constants/role.constant';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService{

  public currentUser!: any;

  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);   
      if(this.currentUser && (this.currentUser.role === ROLE.ADMIN || this.currentUser.role === ROLE.USER)){
        return true;
      }
      this.router.navigate(['']);
      return false;
    }

}

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject( AuthGuardService).canActivate(route, state);
}
