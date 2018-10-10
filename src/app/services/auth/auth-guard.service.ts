import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;

    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
