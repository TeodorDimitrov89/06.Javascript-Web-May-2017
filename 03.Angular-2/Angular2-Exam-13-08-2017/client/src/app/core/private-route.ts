import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

import { Router } from '@angular/router';

@Injectable()

export class PrivateRoute implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate():boolean {
    // return this.authService.isUserAuthenticated();
    if (this.authService.isUserAuthenticated()) {  return true; }
    this.router.navigateByUrl('/users/login');
    return false;
  }
}