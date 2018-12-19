import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalModule } from '../../shared';

import { LoginComponent } from './login.component';

import { AuthService } from '../../services';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ModalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent
  ],
  providers: [AuthService]
})
export class LoginModule {}
