import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ApiService } from '../api';
import { PATH } from '../api-url';

@Injectable()
export class AuthService implements CanActivate {
  INFO_KEY: string = 'kidney_login_info';
  JWT_KEY: string = 'kidney_access_token';

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {
    if (window.sessionStorage.getItem(this.JWT_KEY) && window.sessionStorage.getItem(this.INFO_KEY)) {
      this.setJwt(
        window.sessionStorage.getItem(this.JWT_KEY),
        window.sessionStorage.getItem(this.INFO_KEY)
      );
    }
  }

  setJwt(jwt: string, info: string) {
    window.sessionStorage.setItem(this.JWT_KEY, jwt);
    window.sessionStorage.setItem(this.INFO_KEY, info);
    this.apiService.setHeader();
  }

  authenticate(creds) {
    return this.apiService.post(`${PATH.login}`, { username: creds.username, password: creds.password });
  }

  signout() {
    window.sessionStorage.removeItem(this.JWT_KEY);
    window.sessionStorage.removeItem(this.INFO_KEY);
    this.router.navigate(['', 'login']);
  }

  isAuthorized(): boolean {
    return Boolean(window.sessionStorage.getItem(this.JWT_KEY) && window.sessionStorage.getItem(this.INFO_KEY));
  }

    canActivate(): boolean {
    const isAuth = this.isAuthorized();
    // console.log(isAuth);

    if (!isAuth) {
      this.router.navigate(['login']);
    }

    return isAuth;
  }
}
