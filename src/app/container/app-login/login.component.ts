import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  enableShow: boolean = false;
  message: string;

  constructor(
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit() {}

  onSubmit(form: any): void {
    this._authService.authenticate(form)
      .subscribe(
        data => {
          if (data.data && data.data.backendAdministrator && data.code === 0) {
            this._authService.setJwt(
              data.data.accessToken,
              JSON.stringify(data.data.backendAdministrator)
            );
            this.router.navigate(['']);
          } else {
            this.message = data.msg;
            this.enableShow = true;
          }
        }, err => {
          this.message = "连接服务器出错";
          this.enableShow = true;
        })
  }
}
