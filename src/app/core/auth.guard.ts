import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  loggedIn = false;

  constructor(private router: Router,
              private auth: AuthService ) { }

  canActivate(): boolean {
    this.loggedIn = this.auth.authenticated();
    if (!this.loggedIn) {
      this.router.navigate(['/login']);
    } else {
      console.log('guard prevented you from going there');
    }
    return this.loggedIn;
  }
}
