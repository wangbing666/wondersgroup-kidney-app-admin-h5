import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UserEditComponent } from './user-edit';
import { IntegralDetailComponent } from './integral-detail';

import { TabSingleModule, DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { UserService, UserFormService, UserTableService ,UserIntegralDetailTableService } from './_service';

import { AuthService } from '../../../services';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: UserComponent
}];

@NgModule({
  imports: [
    CommonModule,
    TabSingleModule,
    DynamicTableModule,
    DynamicFormModule,
    EditModule,
    ModalModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserComponent,
    UserEditComponent,
    IntegralDetailComponent
  ],
  providers: [
    UserService,
    UserFormService,
    UserTableService,
    UserIntegralDetailTableService
  ]
})
export class UserModule {}